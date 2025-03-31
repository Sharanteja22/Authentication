import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    username: {
        type: String,   
        required: true,
        unique: true
    },
    email: {
        type: String,   
        required: true,
        unique: true
    },
    password: {
        type: String,   
        required: true,
    },
    profilePicture:{
        type: String,
        default: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid.jpg",
    },
},{timestamps : true});

const User=mongoose.model("User",userScheme);

export default User;