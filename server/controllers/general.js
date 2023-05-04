import User from '../models/userModel.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
            .populate('managedBy')
            .populate('submittedTickets')
            .populate('managedUsers')
            .populate('ownedCampaigns')
            .populate('usersCampaigns')
            .exec();

        res.status(200).json(user)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({isAdmin: true}).select('-password');
        res.status(200).json(admins)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getAdminById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.find({_id: id, isAdmin: true})
            .populate('managedUsers', 'firstName lastName email usersCampaigns')
            .populate({
                path: 'ticketsOwned',
                select: "category message status priority createdAt",
                populate: {
                    path: 'submittedBy',
                    select: 'firstName lastName email'
                },
            })
            .populate({
                path: 'ownedCampaigns',
                populate: {
                    path: 'targetUser',
                    select: 'firstName lastName email'
                }
            }
            )
            .select("-password").sort({createdAt: -1})
        res.status(200).json(...user)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;

        const oldUser = await User.findById(id); // this is the user before the update
        const oldManagedBy = oldUser.managedBy; // either null or a user id
        const newManagedBy = updatedUser.managedBy; // either null or a user id

        if (newManagedBy !== oldManagedBy) {
            // initial value of oldManagedBy will be null so this will be skipped until we assign a user to a manager or we reassign a user to a different manager or we change the manager of a user to unassigned
            if (oldManagedBy) {
                await User.findByIdAndUpdate(
                    oldManagedBy,
                    {$pull: {managedUsers: id}},
                    {new: true}
                );
            }

            // if there is a new manager, (initially there will be no manager) then we will add the user to the new manager's managedUsers array (if the user is unassigned, then newManagedBy will be null
            if (newManagedBy) {
                await User.findByIdAndUpdate(
                    newManagedBy,
                    {$push: {managedUsers: id}},
                    {new: true}
                );
            }
        }

        const user = await User.findByIdAndUpdate(id, updatedUser, {new: true})
            .populate('managedBy')
            .populate('submittedTickets')
            .populate('managedUsers')
            .populate('ownedCampaigns')
            .populate('usersCampaigns')
            .exec();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const getNonAdmins = async (req, res) => {
    try {
        const users = await User.find({isAdmin: false});
        res.status(200).json(users)

    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}
