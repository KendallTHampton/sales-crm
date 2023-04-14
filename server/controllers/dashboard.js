import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";

export const getTickets = async (req, res) => {
    try {
        // only want to get the first name last name and email from the user document
        const tickets = await Ticket.find({}).populate('submittedBy', 'firstName lastName email').populate('ownedBy', 'firstName lastName email').sort({createdAt: -1})
        //populate() is used to automatically populate references in a document with documents from other collections. In this case, the createdBy field in the ticket document is populated with the user document that has the same id as the createdBy field in the ticket document.
        console.log(tickets)

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

export const updateTicket = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedTicket = req.body
        console.log(updatedTicket)

        const ticket = await Ticket.findByIdAndUpdate(id, updatedTicket, {new: true}).populate('submittedBy', 'firstName lastName email').populate('ownedBy', 'firstName lastName email');

        if (!ticket) {
            res.status(404).json({message: 'Ticket not found'});
            return;
        }

        // We will check to see if we changed the owner of the ticket. first we will see if there is an owner. Since the ticket will now change


        if (req.body.ownedBy && req.body.ownedBy !== ticket.ownedBy.id) {
            // Remove the ticket from the previous owner's ticketsOwned array
            await User.findByIdAndUpdate(
                ticket.ownedBy.id,
                {$pull: {ticketsOwned: ticket.id}},
                {new: true}
            );

            // Add the ticket to the new owner's ticketsOwned array
            await User.findByIdAndUpdate(
                req.body.ownedBy,
                {$addToSet: {ticketsOwned: ticket.id}},
                {new: true}
            );
        }

        res.status(200).json(ticket);
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }



}

