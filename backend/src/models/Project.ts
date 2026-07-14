import mongoose,{Schema, Document} from "mongoose";
import User from "./User"

export interface IProject extends Document {
    title : string,
    description : string,
    budget : number,
    duration : number,
    client : mongoose.Types.ObjectId,
    status : "open" | "in-progress" | "completed" | "cancelled";
}

const projectSchema = new Schema<IProject>({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    budget : {
        type : Number,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    client : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    status : {
        type : String,
        enum : ["open", "in-progress", "completed", "cancelled"],
        default : "open"
    }

},{timestamps : true});

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;