import express, {Request, Response} from "express";
const gigRouter = express.Router();
import Gig from "../models/Gig";
import authorize from "../middlewares/roleAuthorize.middlewares";

gigRouter.post("/gig/create", authorize("freelancer"), async(req : Request, res: Response)=>{
    try{
       const {title, price, duration, images, rating}= req.body;
       if(!title || !price || !duration || !images || !rating){
          throw new Error("All fields are required!!");
       }
       const gig = await Gig.create({
        title,
        price,
        duration,
        images, 
        rating
       });

       await gig.save();

       res.json({
        message : "Gig created !"
       })
    }
    catch(err){
        res.json({
            message: "Error: "+err
        });
    }
});

gigRouter.get("/gig/:id", async(req : Request, res:Response)=>{
    try{
       const {id} = req.params;

       const gig = await Gig.findById(id);
       if(!gig){
        throw new Error("No gig found")
       }

       res.json({
        message : "Gig found",
        data : gig
       });
    }
    catch(err){
        res.json({
            message : "Error: "+err
        });
    }
});

gigRouter.get("/gig/getall", async(req : Request, res:Response)=>{
    try{
       const {id} = req.params;

       const gig = await Gig.find();
       if(!gig){
        throw new Error("No gig found")
       }

       res.json({
        message : "Gig found",
        data : gig
       });
    }
    catch(err){
        res.json({
            message : "Error: "+err
        });
    }
});

gigRouter.patch("/gig/:id", async(req : Request, res:Response)=>{
    try{
       const {id} = req.params;
       const {title, price, duration, images}= req.body;

       const gig = await Gig.findByIdAndUpdate(id,{
        title,
        price,
        duration,
        images
       },{new : true});

       if(!gig){
        throw new Error("No gig found")
       }

       res.json({
        message : "Gig found",
        data : gig
       });
    }
    catch(err){
        res.json({
            message : "Error: "+err
        });
    }
});

gigRouter.delete("/gig/:id", async(req : Request, res:Response)=>{
    try{
       const {id} = req.params;
       const {title, price, duration, images}= req.body;

       const gig = await Gig.findByIdAndDelete(id,{
        title,
        price,
        duration,
        images
       });
       
       if(!gig){
        throw new Error("No gig found")
       }

       res.json({
        message : "Gig found",
       });
    }
    catch(err){
        res.json({
            message : "Error: "+err
        });
    }
});

