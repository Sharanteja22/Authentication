import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup=async (req,res,next)=>{
    const {username, email, password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10)
    const newUser=new User({username, email, password:hashedPassword}); 
    try {
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        next(error);
    }
}


export const signin=async (req,res,next)=>{
    const {email, password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const isPasswordValid=bcryptjs.compareSync(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const {password:hashedPassword, ...others}=user._doc;
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        const expiryDate=new Date(Date.now()+24*60*60*1000);
        res.cookie('access_token',token,{httpOnly:true, expires:expiryDate}).status(200).json(others);  
    } catch (error) {
        next(error);
    }
}    