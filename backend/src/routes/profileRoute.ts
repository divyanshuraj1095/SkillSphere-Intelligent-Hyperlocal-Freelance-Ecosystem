import User from "../models/User"
import express,{Request, Response} from "express"
const profileRouter = express.Router();
import { authUser } from "../middlewares/auth.middlewares";

profileRouter.get("/getProfile", authUser,  async(req : Request, res :Response)=>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email})

        if(!user){
           throw new Error("User not find")
        }

        res.json({
            message : "User Data",
            data : user
        })
    }
    catch(err){
          res.status(400).json({
            message : "Error: "+err
          })
    }
})