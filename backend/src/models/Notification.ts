import mongoose, { Schema, Document } from "mongoose"

export interface INotification extends Document {
    user: Schema.Types.ObjectId,
    message: String,
    type: "proposal"| "payment"| "chat"| "project",
    isRead: Boolean
}

const notificationSchema = new Schema<INotification>({
    user:{
        type: Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    message : {
        type : String,
        required: true
    },
    type: {
        type : String,
        enum: ["proposal", "payment", "chat", "project"]
    },
    isRead:{
        type: Boolean,
        default: false
    }

}, {timestamps: true})

const Notification = mongoose.model<INotification>("Notification", notificationSchema);

export default Notification