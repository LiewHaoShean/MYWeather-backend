import asyncHandler from 'express-async-handler';
import Post from '../model/Post.js';
import User from '../model/User.js';
import Like from '../model/Like.js';

export const likePost = asyncHandler(async(req, res)=>{
    const postId = req.params.postId;
    const userFound = await User.findById(req.userAuthId);
    const postFound = await Post.findById(postId);
    const likeFound = await Like.find({user: userFound?._id, post: postFound?._id});
    console.log(likeFound);

    if (likeFound.length > 0){
        throw new Error("You already liked the post!")
    }else{
        const like = await Like.create({
            user: userFound?._id,
            post: postFound?._id,
        });
    
        postFound.likes.push(like?._id);
        await postFound.save();
        
        res.status(201).json({
            status: "success",
            message: "Post liked successfully.",
            like
        });
    }
});

export const fetchLikePost = asyncHandler(async(req, res)=>{
    const likePostFound = await Like.find({user: req.userAuthId}).populate("post").populate("user");

    res.status(201).json({
        status: "success",
        message: "Liked post fetched successfully",
        likePostFound
    })
})

export const dislikePost = asyncHandler(async(req, res)=>{
    const postId = req.params.postId;
    const userFound = await User.findById(req.userAuthId);
    const postFound = await Post.findById(postId);
    const likeFound = await Like.find({user: userFound?._id, post: postFound?._id});
    

    if(likeFound.length < 0 ){
        throw new Error("You did not like the post before!")
    }

    const like = await Like.findOneAndDelete({
        user: userFound?._id,
        post: postFound?._id,
    });

    postFound.likes.remove(like?._id);
    await postFound.save();
    
    res.status(201).json({
        status: "success",
        message: "Post disliked successfully!",
        like
    });
    
})