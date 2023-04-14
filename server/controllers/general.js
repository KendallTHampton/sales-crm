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
        const user = await User.findById(id).populate('tickets', 'category message status date')
        res.status(200).json(user)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({isAdmin: true});
        res.status(200).json(admins)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

