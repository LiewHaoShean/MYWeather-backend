import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        rqeuired: true,
        ref: "Post"
    }
},{
    timestamps: true
})

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;