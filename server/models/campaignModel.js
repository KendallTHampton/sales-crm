import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    startDate: Date,
    endDate: Date,
    revenue: Number,
    ownedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}, // user who created the campaign
    targetUser: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}, // user who is the target
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments', default: []}], // comments
    status: {type: String, default: 'New'},
}, {timestamps: true});

const Campaign = mongoose.model('campaigns', campaignSchema);

export default Campaign;