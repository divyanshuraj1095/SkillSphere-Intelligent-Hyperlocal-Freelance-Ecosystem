import { timeStamp } from "node:console";

const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
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
        required : true
    },
    skills : {
        type : [String]
    },
    picture : {
        type : String
    },
    skillsProficiency : {
        type : Number,
        enum : [1, 2, 3, 4, 5]
    },
    age : {
        type : Number,
        required : true,
        min : 18
    },
    gender : {
        type : String,
        required : true
    }


},{timeStamp : true})


module.exports = new mongoose.Model('Freelancer', freelancerSchema);