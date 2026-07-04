import mongoose, {Schema, Document} from "mongoose";
import User from "./User"
import Project from "./Project";

export interface IProposal extends Document{
    projectId : mongoose.Types.ObjectId,
    freelancerId : mongoose.Types.ObjectId,
    price : Number,
    deliveryDays : Number,
    coverLetter : String,
    status : "pending" | "accepted" | "rejected" | "interested"
}

const proposalSchema = new Schema<IProposal>({
    projectId : {
        type : Schema.Types.ObjectId,
        ref: Project,
        required : true
    },
    freelancerId : {
        type : Schema.Types.ObjectId,
        ref : User,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    deliveryDays : {
        type : Number,
        required : true
    },
    coverLetter : {
        type : String,
        required : true,
        trim : true
    },
    status : {
        type : String,
        enum : ["pending", "accepted", "rejected", "interested"],
        default : "pending"

    }

},{timestamps : true});

const Proposal = mongoose.model<IProposal>("Proposal", proposalSchema);

export default Proposal;