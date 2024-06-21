import asyncHandler from 'express-async-handler';
import Tag from '../model/Tag.js';
import User from '../model/User.js';

export const createTag = asyncHandler(async(req, res)=>{
    const {color, name} = req.body;
    console.log(color, name);
    const userFound = await User.findById(req.userAuthId);
    const tagFound = await Tag.find({
        $or: [
            { name: name },
            { color: color }
        ]
    });

    if(color=='' || name==''){
        throw new Error("Please complete all the details!");
    }

    if(!userFound){
        throw new Error("Please proceed to login first!");
    }

    if(tagFound.lenght>0){
        throw new Error("Tag already exist!")
    }

    const tag = await Tag.create({
        color,
        name,
        user: userFound?._id
    });
    
    res.status(201).json({
        status: "success",
        message: "Tag created successfully.",
        tag
    });
});

export const getAllTag = asyncHandler(async(req, res)=>{
    const tagFound = await Tag.find();

    res.status(201).json({
        status: "success",
        message: "All tags received sucessfully",
        tagFound
    });
})

export const removeTag = asyncHandler(async(req, res)=>{
    const {tagId} = req.body;
    console.log(tagId);
    const tagFound = Tag.findById(tagId);

    if(!tagFound){
        throw new Error("Tag does not exist!");
    }

    const tag = await Tag.findByIdAndDelete(tagId);

    res.status(201).json({
        status: "success",
        message: "Tag deleted successfully"
    });
})