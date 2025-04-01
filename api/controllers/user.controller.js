import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const test= (req,res)=>{
    res.json({
        message: "API Is working",
    });
};


export const updateUser = async (req, res,next ) => {
    if (req.user.id!==req.params.id){
        return next(errorHandler(403,"You can only update your account"));
       }
    try{
        if (req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password 
            } },
            { new: true }
        );
        const {password,...rest}=updatedUser._doc;
        if (!updatedUser) {
            return next(errorHandler(404, "User not found"));
        } else {
            res.status(200).json(rest);      
        }
    }catch(err){
        next(err);
    }
}
