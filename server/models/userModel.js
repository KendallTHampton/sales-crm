import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    submittedTickets: [{type: mongoose.Schema.Types.ObjectId, ref: 'tickets'}],
    ticketsOwned: [{type: mongoose.Schema.Types.ObjectId, ref: 'tickets'}],
    managedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'users', default: []}],
    managedUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'users', default: []}],
    ownedCampaigns: [{type: mongoose.Schema.Types.ObjectId, ref: 'campaigns', default: []}],
    usersCampaigns: [{type: mongoose.Schema.Types.ObjectId, ref: 'campaigns', default: null}]
},
    {timestamps: true}
)


const User = mongoose.model('users', UserSchema);

export default User;

