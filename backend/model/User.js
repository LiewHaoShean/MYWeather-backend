import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailToken: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    feedback: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    idPremium: {
        type: Boolean,
        default: false,
    },
    otpCode: {
        type: Number,
        default: null,
        required: false
    }
}, {
    timestamps: true,
});

//compile the schema
const User = mongoose.model("User", UserSchema);

export default User;