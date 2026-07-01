import mongoose, { Schema, Document } from "mongoose";
import User from "./User";

export interface IGig extends Document{
    freelancerId : mongoose.Types.ObjectId,
    title : String,
    price : Number,
    duration : Number,
    images : String,
    rating : Number
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
    }

},{timestamps: true});

const Gig = mongoose.model<IGig>("Gig", gigSchema);

export default Gig;