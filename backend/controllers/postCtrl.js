import asyncHandler from 'express-async-handler';
import Post from '../model/Post.js';
import Tag from '../model/Tag.js';
import User from '../model/User.js';
import Like from '../model/Like.js';



export const createPost = asyncHandler(async(req, res)=>{
    const {title, description, tag} = req.body;
    const convertedImgs = req.files.map((file)=>file?.path);
    const userFound = await User.findById(req.userAuthId);
    const tagFound = await Tag.findOne({
        name: tag,
    });

    if(!tagFound){
        throw new Error(
            'Tag not found, please create tag first!'
        );
    };

    if(title=='' || description=='' || tag==''){
        throw new Error("Please complete all the details");
    }

    const post = await Post.create({
        title,
        user: req.userAuthId,
        description,
        tag: tagFound?._id,
        images: convertedImgs,
    })
    tagFound.posts.push(post._id);
    await tagFound.save();

    userFound.posts.push(post._id);
    await userFound.save();

    res.status(201).json({
        status: "success",
        message: "Post created successfully.",
        post
    })
});

export const fetchOwnPost = asyncHandler(async(req, res)=>{
    const userFound = await User.findById(req.userAuthId);
    const postFound = await Post.find({user: userFound?.id}).populate('user').sort({ createdAt: -1 }).populate('tag');
    const userLikes = await Like.find({user: req.userAuthId}).select("post");

    res.status(201).json({
        status: "success",
        message: "Post received successfully.",
        postFound,
        userLikes: userLikes.map((like)=>like.post)
    });
});

export const fetchAllPost = asyncHandler(async(req, res)=>{
    const postFound = await Post.find().populate('user').populate("tag").sort({ createdAt: -1 });

    const userLikes = await Like.find({user: req.userAuthId}).select("post");

    res.status(201).json({
        status: "success",
        message: "All post received successfully.",
        postFound,
        userLikes: userLikes.map((like)=> like.post)
    })
})

export const fetchOnePost = asyncHandler(async(req, res)=>{
    const postId = req.params.postId;
    const postFound = await Post.findById(postId).populate('user').populate('tag');
    const userLikes = await Like.find({user: req.userAuthId}).select("post");
    console.log(userLikes);

    // console.log(postFound)

    res.status(201).json({
        status: "success",
        message: "Post received successfully.",
        postFound,
        userLikes: userLikes.map((like)=> like.post)
    })
});

export const fetchMostLikePost = asyncHandler(async(req, res)=>{
    const postFound = await Post.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $addFields: {
                likesCount: { $size: "$likes" }
            }
        },
        { $sort: { likesCount: -1 } },
        { $limit: 1 }
    ]);

    // Check no post was found
    if (postFound.length === 0) {
        throw new Error("No post yet!");
    }

    res.status(200).json({
        status: "success",
        message: "Post with highest likes received successfully.",
        postFound: postFound[0]
    });
})

