import express, {Request, Response} from "express"
const notificationRouter = express.Router();
import Notification from "../models/Notification";
import { authRequest } from "../types/authRequest";

notificationRouter.get("/notification", async(req: authRequest, res: Response)=>{
    try{
        const notification = await Notification.find();
        if(!notification){
            throw new Error("No notification found!");
        }

        res.status(200).json({
            message: "Notifications",
            data: notification
        })
    }
    catch(err){
        res.status(400).json({
            messsage: "Error: "+err
        });
    }
});

notificationRouter.get("/notification/:id", async(req: authRequest, res: Response)=>{
    try{
        const {id} = req.params;
        const notification = await Notification.findById(id);
        if(!notification){
            throw new Error("No notification available");
        }

        res.status(200).json({
            message: "Notification available",
            data: notification
        });
    }
    catch(err){
        res.status(400).json({
            message: "Error: "+err
        });
    }
});

notificationRouter.delete("/notification/:id", async(req: authRequest, res: Response)=>{
    try{
        const {id} = req.params;

        const notification = await Notification.findById(id);

        if(!notification){
           throw new Error("No notification found to delete");
        }

        if(notification.user.toString() !== req.user!._id.toString()){
            throw new Error("Unauthorized")
        }

        await notification.deleteOne()

        res.status(200).json({
            message: "Deleted SuccessFully"
        });
    }
    catch(err){
        res.status(400).json({
            message: "Error: "+err
        })
    }
});

notificationRouter.patch("/notification/:id", async(req: authRequest, res: Response)=>{
    try{
        const {id} = req.params;
        
        const notification = await Notification.findByIdAndUpdate(
            {
             _id: id,
             user: req.user!._id
            },
            {
              isRead: true
            },
            {new: true});

        if(!notification){
            throw new Error("No notification found to update");
        }

        res.status(200).json({
            message: "Updated Successfully",
            data: notification
        })
    }
    catch(err){
        res.status(400).json({
            message: "Error: "+err
        })
    }
});

export default notificationRouter;