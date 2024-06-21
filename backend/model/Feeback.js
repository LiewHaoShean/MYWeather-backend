import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            required: [true, "Please add a rating between 1 and 5"],
            min: 1,
            max: 5,
        },
        description: {
            type: String,
            required: true
        }
}, {
    timestamps: true,
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;