import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
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

const Like = mongoose.model("Like", LikeSchema);

export default Like;