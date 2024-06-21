import asyncHandler from 'express-async-handler'
import Feedback from "../model/Feeback.js";
import User from "../model/User.js";

export const giveFeedback = asyncHandler(async(req, res)=> {
    const {rating, description} = req.body;

    const userFound = await User.findById(req.userAuthId).populate('feedback');

    if(!userFound){
        throw new Error('User does not exist');
    };

    // check user have done review or not
    const hasGivenFeedback = userFound?.feedback?.find((feedback)=>{
        return feedback?.user?.toString() === req?.userAuthId.toString();
    })

    if(hasGivenFeedback){
        throw new Error("You have already given a feedback before!");
    }

    const feedback = await Feedback.create({
        user: req.userAuthId,
        rating,
        description
    });

    userFound.feedback.push(feedback?._id);
    await userFound.save();

    res.status(201).json({
        success: true,
        message: "Feedback created successfully",
        feedback
    });

})

export const getAllFeedback = asyncHandler(async(req, res)=>{
    const feebackFound = await Feedback.find().populate('user').sort({ createdAt: -1 })

    res.status(201).json({
        success: true,
        message: "All feedback fetched successfully!",
        feebackFound
    });
});

export const getOneFeedback = asyncHandler(async(req, res)=>{
    const feedbackId = req.params.feedbackId;
    const feedbackFound = await Feedback.findById(feedbackId).populate('user');

    res.status(201).json({
        status: "success",
        message: "Feedback fetched successfully",
        feedbackFound
    })
})