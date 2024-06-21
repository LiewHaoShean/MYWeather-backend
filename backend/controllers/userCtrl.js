import User from "../model/User.js";
import bycrpt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from "../utils/generateToken.js";
import crypto from 'crypto';
import { sendMail } from "../utils/sendMail.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";
import { error } from "console";

export const registerUserCtrl = asyncHandler(async(req, res)=>{
    const { fullname, email, password, age, phoneNumber } = req.body;
    const userExist = await User.findOne({ email });
    if(userExist){
        throw new Error("User already exists.")
    }
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);
    //create user

    const isValidate = email.includes('@');

    if(!isValidate){
        throw new Error('Please entered an valid email address!')
    };
    
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword ,
        age: age,
        phoneNumber: phoneNumber,
        emailToken: crypto.randomBytes(18).toString("hex")
    });

    const link = `http://localhost:3000/verify-email/${user?.emailToken}`
    await sendMail({
        email: 'limkoksiag28@gmail.com', 
        subject: "Account Verification",
        text: "Welcome",
        html: `
        <div>
            <h1>Hi greetings from MYweather!</h1>
            <h3>This is the verification link for account activation purpose.</h3>
            <a href=${link}>Click here to activate your account</a>
        </div>
        `
    });
    res.status(201).json({
        status: "success",
        message: "Message sent sucessfully",
        data: user,
        
    })

});

export const loginUserCtrl = asyncHandler (async (req, res)=> {
    const {email, password} = req.body;
    //find user in db
    const isValidate = email.includes('@');

    if(!isValidate){
        throw new Error('Please entered an valid email address!')
    };

    const userFound = await User.findOne({
        email,
    });
    if(userFound && userFound.isVerified && await bycrpt.compare(password, userFound.password)){
        res.json({
            status: 'Success',
            message: "Login successfully!",
            userFound,
            token: generateToken(userFound?.id, '2 days')
        })
    }else if(userFound?.isVerified ===  false){
        throw new Error("Please verify your account first!");
    }else{
        throw new Error("You Entered Invalid Login Credentials!")
    }
});

export const verifyUserEmail = asyncHandler( async (req, res)=>{
    try {
        const emailToken = req.params.token;
        // console.log(emailToken);
        if (!emailToken) return res.status(404).json("Email Token not found..");

        const user = await User.findOne({ emailToken });
        
        if (user){
            user.emailToken = null;
            user.isVerified = true;

            await user.save();

            
            res.status(200).json({
                message: 'Email verified successfully!',
                user,
            })
        }else{
            res.status(404).json("Email verification failed, invalid token!");
        }
    }catch (error){
        console.log(error);
        res.status(500).json(error.message);
    }
});

export const getUserProfileCtrl = asyncHandler(async(req, res)=>{
    //find the user
    const userFound = await User.findById(req.userAuthId);
    res.json({
        status: "success",
        message: "Profile Updated Successfully!",
        userFound,
    });
    // const token = getTokenFromHeader(req);
    // const verified = verifyToken(token);
});


export const getAllUserCtrl = asyncHandler(async(req, res)=>{
    const userFound = await User.find().sort({ fullname: 1 });
    res.json({
        status: "success",
        message: "All user fetched",
        userFound
    })
})

export const editUserCtrl = asyncHandler(async(req, res)=>{
    console.log(req.body);
    const {fullname, email, phoneNumber, age} = req.body;
    const userFound = await User.findById(req.userAuthId);

    if(!userFound){
        throw new Error("User Not Found!")
    }
    
    const user = await User.findOneAndUpdate({_id: userFound?._id},
        {
            fullname,
            email,
            phoneNumber,
            age
        }
    );

    res.status(201).json({
        status: "success",
        message: "Profile updated successfully!",
        user
    })
});

export const generateOtp = asyncHandler(async(req, res)=>{
    const {email} = req.body;
    const userFound = await User.findOne({
        email: email
    });

    if(!userFound){
        throw new Error("Invalid email! User does not exist!")
    };

    const otpCode = await Math.floor(100000 + Math.random()*900000);

    await sendMail({
        email: `${email}`, 
        subject: "Otp verification Code",
        text: "Welcome",
        html: `
        <div>
            <h1>Hi greetings from MYweather!</h1>
            <h3>Here is the verification OTP to change your password.</h3>
            <h1>${otpCode}</h1>
        </div>
        `
    });

    const userUpdate = await User.findByIdAndUpdate(userFound?._id, {
        otpCode: otpCode
    }, {new: true})

    res.status(201).json({
        status: "success",
        message: "OTP sent sucessfully!",
        data: userUpdate,
    })
});

export const validateOtpCode = asyncHandler(async(req, res)=>{
    const {email, otpNumber} = req.body;

    const userFound = await User.findOne({
        email: email,
        otpCode: otpNumber
    });

    if(!userFound){
        throw new Error("Invalid Otp Number!")
    };

    const userUpdate = await User.findByIdAndUpdate(userFound?._id, {
        otpCode: null
    }, {new: true});

    res.status(201).json({
        status: "success",
        message: "OTP Code validated successfully!",
        data: userUpdate,
    })
});

export const changePassword = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    const userUpdate = await User.findOneAndUpdate({
        email: email
    }, {
        password: hashedPassword
    }, {new: true});

    res.status(201).json({
        status: "success",
        message: "Password updated successfully!",
        data: userUpdate,
    })
})