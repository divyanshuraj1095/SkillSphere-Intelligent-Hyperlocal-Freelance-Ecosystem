import User from "../models/User"
import express,{ Response} from "express"
import { authRequest } from "../types/authRequest";
const profileRouter = express.Router();

profileRouter.get("/profile",  async(req : authRequest, res :Response)=>{
    try{
        const user = await User.findById(req.user!._id);

        if (!user) {
            throw new Error("User not found");
        }

        return res.status(200).json({
            message: "User Data",
            data: user
        });
    }
    catch(err){
          res.status(400).json({
            message : "Error: "+err
          })
    }
});

profileRouter.patch("/profile", async(req : authRequest, res :Response)=>{
    try{
        const {name, email, password} = req.body;
        const id = req.user!._id

        const user = await User.findByIdAndUpdate(id,{
            name,
            email,
            password
        },{new : true});

        if(!user){
           throw new Error("User not find")
        }

        res.json({
            message : "Updated Data",
            data : user
        })
    }
    catch(err){
          res.status(400).json({
            message : "Error: "+err
          })
    }
});

export default profileRouter