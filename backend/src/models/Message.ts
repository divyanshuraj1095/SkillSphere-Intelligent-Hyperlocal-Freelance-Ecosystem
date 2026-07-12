import mongoose, { Schema } from "mongoose";
import Project from "./Project";
import User from "./User";

const messageSchema = new mongoose.Schema({
  projectId : {
    type : Schema.Types.ObjectId,
    ref : Project
  },  
  sender :{
    type : Schema.Types.ObjectId,
    ref : User
  },
  message : {
    type : String,
    required : true
  }
},{timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message