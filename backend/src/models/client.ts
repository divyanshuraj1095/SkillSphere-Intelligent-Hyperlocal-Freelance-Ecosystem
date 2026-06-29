const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name : {
        type : String,
        reuired : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }

},{timeStamp : true})