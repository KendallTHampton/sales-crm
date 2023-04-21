import Ticket from '../models/ticketModel.js';
import User from '../models/userModel.js';

// When the user signs in they can send a ticket so from the body we will need to find the User and then create a ticket for that user
export const sendATicket = async (req, res) => {
    const {category, message, userId} = req.body;

    try {
        const user = await User.findById(userId)
        const createTicket = await Ticket.create(

            {category, message, submittedBy: user._id}
        )
        await user.updateOne({$push: {submittedTickets: createTicket._id}})


        res.status(200).json({message: 'Ticket Sent!'})
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}




