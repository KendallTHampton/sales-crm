import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    tickets: [{type: mongoose.Schema.Types.ObjectId, ref: 'tickets'}],
    ticketsOwned: [{type: mongoose.Schema.Types.ObjectId, ref: 'tickets'}],
},
    {timestamps: true}
)


const User = mongoose.model('users', UserSchema);

export default User;

