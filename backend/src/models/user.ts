import { timeStamp } from "node:console";

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

},{timeStamp:true})

module.exports = new mongoose.Model('User', userSchema);