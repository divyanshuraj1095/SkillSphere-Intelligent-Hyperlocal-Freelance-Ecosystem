import express,{Request, Response} from "express";
const projectRouter = express.Router();
import Project from "../models/Project";
import { authRequest } from "../types/authRequest";
import authorize from "../middlewares/roleAuthorize.middlewares";

projectRouter.post("/create", authorize("client"), async(req : authRequest, res : Response)=>{
    try{
        const {title, description, budget, duration, status} = req.body;
        const client = req.user!._id;

        if(!title || !description || !budget || !duration){
            throw new Error("All fields are required!!");
        }

        const project = await Project.create({
            title,
            description,
            budget,
            duration,
            client,
            status
        });

        await project.save();

        res.json({
            message : "Project posted Successfully",
            data : project
        });

    }
    catch(err){
        res.status(400).json({
            message : "Error: "+err
        });
    }
});

projectRouter.get("/getAll", async(req : authRequest, res : Response)=>{
    try{
        const project = await Project.find();

        if(!project){
            throw new Error("No project found !!");
        }

        res.json({
            message : "All projects!!",
            data : project
        });
    }
    catch(err){
        res.status(400).json({
            message : "Error: "+err
        });
    }
});

projectRouter.get("/get/:id", async(req : authRequest, res : Response)=>{
    try{

        const {id} = req.params;
        const project = await Project.findById(id);

        if(!project){
            throw new Error("Project not found !!");
        }

        res.json({
            message : "Fetched Successfully",
            data : project
        });
    }
    catch(err){
        res.status(400).json({
            message : "Error: "+err
        });
    }
});

projectRouter.put("/projects/:id", async(req: authRequest, res: Response)=>{
    try{
       const {id} = req.params
       const {title, description, budget, duration} = req.body;

       const project = await Project.findById(id);
       if(!project){
        throw new Error("No project found !!");
       }
       if(project.client.toString() !== req.user!._id.toString()){
          return res.status(403).json({
            message : "Unauthorized"
          })
       }
       const update = await Project.findByIdAndUpdate(id,{
         title,
         description,
         budget,
         duration,
       },{new : true});
       res.json({
        message : "Updated Successfully!!",
        data : update
       })
    }
    catch(err){
       res.json({
        message : "Error: "+err
       });
    }
});

projectRouter.delete("/projects/:id", async(req: authRequest, res: Response)=>{
    try{
       const {id} = req.params;
       const project = await Project.findByIdAndDelete(id);
       if(!project){
          throw new Error("No project found to delete");
       }

       res.json({
        message : "Deleted Successfully!!"
       });
    }
    catch(err){
        res.json({
            message : "Error: "+err
        });
    }
});

projectRouter.get("/project", async(req : authRequest, res : Response)=>{
 try{
    const {title, budget, duration, status, minDuration, maxDuration} = req.query;
    const filter:any = {};
    if(title){
        filter.title = {
            $regex : title,
            $options: "i"
        }
    }
    if(budget){
        filter.budget = {
            $lte : Number(budget)
        }
    }
    if(status){
        filter.status = status
    }

    if (minDuration || maxDuration) {
       filter.duration = {};

       if (minDuration) {
        filter.duration.$gte = Number(minDuration);
       }

       if (maxDuration) {
        filter.duration.$lte = Number(maxDuration);
       }
    }
    const projects = await Project.find(filter);

    res.json({
        message : "Projects Found",
        data : projects
    })
 }
 catch(err){
    res.json({
        message : "Error: "+err
    })
 }
});

export default projectRouter;