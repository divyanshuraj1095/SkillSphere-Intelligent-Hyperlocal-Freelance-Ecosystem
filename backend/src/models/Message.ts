import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
  projectId : {
    type : Schema.Types.ObjectId,
    ref : "Project",
    required: true
  },  
  sender :{
    type : Schema.Types.ObjectId,
    ref : "User",
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message : {
    type : String,
    required : true
  }
},{timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message