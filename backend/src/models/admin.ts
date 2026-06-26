import { timeStamp } from "node:console";

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    }

},{timeStamp:true})

module.exports = new mongoose.Model('Admin', adminSchema);