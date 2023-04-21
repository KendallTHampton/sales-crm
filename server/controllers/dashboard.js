import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";
import Campaign from "../models/campaignModel.js";

// TICKETS
export const getTickets = async (req, res) => {
    try {
        // only want to get the first name last name and email from the user document
        const tickets = await Ticket.find({}).populate('submittedBy', 'firstName lastName email').populate('ownedBy', 'firstName lastName email').sort({createdAt: -1})
        //populate() is used to automatically populate references in a document with documents from other collections. 
        res.status(200).json(tickets)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getTicketById = async (req, res) => {
    try {
        const id = req.params.id;
        const ticket = await Ticket.findById(id).populate('submittedBy', 'firstName lastName email').populate('ownedBy', 'firstName lastName email')
        res.status(200).json(ticket)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getTicketsSubmittedByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const tickets = await Ticket.find({submittedBy: userId}).populate('submittedBy', 'firstName lastName email').populate('ownedBy', 'firstName lastName email').sort({createdAt: -1})

        res.status(200).json(tickets)
    }
    catch (error) {
        res.status(404).json({message: error.message})

    }
};

export const updateTicket = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedTicket = req.body;
        const oldTicket = await Ticket.findById(id);

        if (!oldTicket) {
            res.status(404).json({message: 'Ticket not found'});
            return;
        }

        const oldOwnerId = oldTicket.ownedBy; // either null or a user id
        const newOwnerId = updatedTicket.ownedBy; // either null or a user id

        if (newOwnerId !== oldOwnerId) {
            if (oldOwnerId) {
                // There is a old owner (initally it will be null) so this will be skipped until we assign a ticket to a user or we reassign a ticket to a different user or we change the ownership of a ticket to unassigned
                await User.findByIdAndUpdate(
                    oldOwnerId,
                    {$pull: {ticketsOwned: id}},
                    {new: true}
                );
            }

            if (newOwnerId) {
                // if there is a new owner, (initially there will be no owner) then we will add the ticket to the new owner's ticketsOwned array (if the ticket is unassigned, then newOwnerId will be null
                await User.findByIdAndUpdate(
                    newOwnerId,
                    {$addToSet: {ticketsOwned: id}},
                    {new: true}
                );
            }
        }

        // Once we get the User documents updated, we can update the ticket
        const ticket = await Ticket.findByIdAndUpdate(id, updatedTicket, {new: true}).populate('submittedBy', 'firstName lastName email').populate('ownedBy', 'firstName lastName email');
        res.status(200).json(ticket);
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
};


export const deleteTicket = async (req, res) => {
    try {
        const id = req.params.id;
        const ticket = await Ticket.findById(id)

        const ownerId = ticket.ownedBy; // either null or a user id
        const submittedById = ticket.submittedBy; // user who submitted the ticket

        if (ownerId) {
            await User.findByIdAndUpdate(ownerId, {$pull: {ticketsOwned: id}}, {new: true});
        }

        await User.findByIdAndUpdate(submittedById,
            {$pull: {tickets: ticket._id}});


        ticket.remove({_id: id});
        res.status(200).json(ticket)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }


}


// Managed
export const getContacts = async (req, res) => {
    try {
        const id = req.params.id;

        const users = await User.findById(id).populate('managedUsers', 'firstName lastName email usersCampaigns').select("-password").sort({createdAt: -1})
        res.status(200).json(users.managedUsers)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

// Campaigns

export const getCampaigns = async (req, res) => {
    try {
        const id = req.params.id;
        const users = await User.findById(id).populate({
            path: 'createdCampaigns',
            populate: {
                path: 'targetUser',
                select: 'firstName lastName email'
            },


        })
        res.status(200).json(users.createdCampaigns)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getCampaignById = async (req, res) => {
    try {
        const id = req.params.id;
        const campaign = await Campaign.findById(id).populate('targetUser', 'firstName lastName email').populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'firstName lastName email'
            }
        })
        res.status(200).json(campaign)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}