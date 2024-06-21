import asyncHandler from 'express-async-handler';
import Comment from '../model/Comment.js';
import User from '../model/User.js';
import Post from '../model/Post.js';


export const createComment = asyncHandler(async(req, res)=>{
    const {newComment, postId} = req.body;
    const userFound = await User.findById(req.userAuthId);
    const postFound = await Post.findById(postId);

    if(!userFound){
        throw new Error("User not found! Please login first!")
    }

    const comment = await Comment.create({
        content: newComment,
        post: postId,
        user: userFound?._id
    });

    postFound.comments.push(comment);
    postFound.save();

    res.status(201).json({
        status: "success",
        message: "Comment posted successfully.",
        comment
    });
})

export const fetchComment = asyncHandler(async(req, res)=>{
    const {postId} = req.body;

    const comment = await Comment.find({
        post: postId
    }).populate("user");
    console.log("yes", comment);

    res.status(201).json({
        status: "success",
        message: "Comment fetched successfully.",
        comment
    })
})