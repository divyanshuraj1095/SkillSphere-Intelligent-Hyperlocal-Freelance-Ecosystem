import express, {Request, Response} from "express";
const messageRouter = express.Router();
import Message from "../models/Message";

messageRouter.get("/message/:projectId", async(req: Request, res: Response)=>{
    try{
        const {projectId} = req.params

        const messages = await Message.find({
            projectId
        }).populate("sender")

        res.json({
            message : "Messages fetched!!",
            data: messages
        });
    }
    catch(err){
        res.status(500).json({
            message : "Error: "+err
        });
    }
});

export default messageRouter