import mongoose, { Schema } from "mongoose";

export interface IPayment extends Document {
    project: mongoose.Types.ObjectId;
    client: mongoose.Types.ObjectId;
    freelancer: mongoose.Types.ObjectId;
    amount: number;
    orderId: string;
    paymentId?: string;
    status: "pending" | "successful" | "failed";
    signature: string
}

const paymentSchema = new mongoose.Schema<IPayment>({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    freelancer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    orderId: {
        type: String,
    },
    paymentId: {
        type: String,
    },
    status:{
        type: String,
        enum: ["pending", "successful", "failed"],
        default: "pending"
    },
    signature: {
        type: String
    }
},{timestamps: true});

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;