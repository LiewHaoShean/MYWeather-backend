import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
    method: {
        type: String,
        required: true,
        default: "Credit Card"
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    cardHolderName: {
        type: String,
        requied: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        requried: true
    }
}, {
    timestamps: true
})

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;