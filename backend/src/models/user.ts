import mongoose, { Schema, Document } from "mongoose";



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

const User =  mongoose.model<IUser>('User', userSchema);

export default User;