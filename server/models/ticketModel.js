import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    category: String,
    message: String,
    status: {type: String, default: 'Open'},
    priority: {type: String, default: 'New'},
    submittedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    ownedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null}
},
    {timestamps: true}
);

const Ticket = mongoose.model('tickets', ticketSchema);

export default Ticket;