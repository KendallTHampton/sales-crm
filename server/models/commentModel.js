import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: String,
    campaign: {type: mongoose.Schema.Types.ObjectId, ref: 'campaigns'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
},
    {timestamps: true}
);

const Comment = mongoose.model('comments', commentSchema);

export default Comment;
