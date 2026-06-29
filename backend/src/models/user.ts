const mongoose = require('mongoose');

import { Document, Schema } from "mongoose";

export interface IUser extends Document{
    name : String,
    email : String,
    password : String,
    role : "client" | "freelancer" | "admin";
}

const userSchema = new Schema<IUser>({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        lower : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ["client", "freelancer", "admin"],
        default : "client"
    }

},{timestamps :true})

module.exports = new mongoose.Model('User', userSchema);