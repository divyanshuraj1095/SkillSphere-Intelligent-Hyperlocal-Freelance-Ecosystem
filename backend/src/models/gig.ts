import mongoose, { Schema, Document } from "mongoose";
import User from "./User";

export interface IGig extends Document{
    freelancerId : mongoose.Types.ObjectId,
    title : string,
    price : number,
    duration : number,
    images : string,
    rating : number,
    description: string
}
const gigSchema = new Schema<IGig>({
    freelancerId : {
        type : Schema.Types.ObjectId,
        ref : User

    },
    title : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    images :{
        type : String,
    },
    rating : {
        type : Number
    },
    description:{
        type: String,
        required: true
    }

},{timestamps: true});

const Gig = mongoose.model<IGig>("Gig", gigSchema);

export default Gig;