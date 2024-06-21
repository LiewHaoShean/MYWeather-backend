import asyncHandler from 'express-async-handler';
import User from '../model/User.js';
import Payment from '../model/Payment.js';

export const makePayment = asyncHandler(async(req, res)=>{
    const {cardNumber, cardHolderName, amount, type} = req.body;
    const userFound = await User.findById(req.userAuthId);
    const paymentFound = await Payment.find({user: userFound?.id});
    console.log(paymentFound);
    if(paymentFound.length > 0){
        throw new Error("You already bought our membership!")
    }

    const payment = await Payment.create({
        user: userFound?.id,
        cardNumber,
        cardHolderName,
        type,
        amount
    })

    res.status(201).json({
        status: "Success",
        message: "Payment Successfull! Please wait within one to two working days for admin approval",
        payment
    })
});

export const getAllTransactions = asyncHandler(async(req, res)=>{
    const paymentFound = await Payment.find().populate('user').sort({ createdAt: -1 });

    res.status(201).json({
        status: "Success",
        message: "All transactions fetched successfully.",
        paymentFound
    })
})

export const approveTransaction = asyncHandler(async(req, res)=>{
    const {paymentId} = req.body;
    const paymentFound = await Payment.findById(paymentId).populate('user');
    const userFound = await User.findById(paymentFound?.user?._id);

    if(!paymentFound){
        throw new Error("Transaction not found!")
    }

    if(!paymentFound){
        throw new Error("User not found!")
    }

    const payment = await Payment.findOneAndUpdate(
        {_id: paymentFound?._id},
        {status: 'approved'}
    )

    const user = await User.findOneAndUpdate(
        {_id: userFound?._id},
        {idPremium: true}
    )

    res.status(201).json({
        status: "success",
        message: "Transaction updated successfully",
        payment
    })
})