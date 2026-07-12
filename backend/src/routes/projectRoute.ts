import express,{Request, Response} from "express";
const projectRouter = express.Router();
import Project from "../models/Project";

projectRouter.post("/create", async(req : Request, res : Response)=>{
    try{
        const {title, description, budget, duration, status} = req.body;
        const client = req.user._id;

        if(!title || !description || !budget || !duration || !status){
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

projectRouter.get("/getAll", async(req : Request, res : Response)=>{
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

projectRouter.get("/get/:id", async(req : Request, res : Response)=>{
    try{

        const {id} = req.params;
        const project = await Project.findOne({id});

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

projectRouter.put("/projects/:id", async(req: Request, res: Response)=>{
    try{
       const {id} = req.params
       const {title, description, budget, duration} = req.body;

       const project = await Project.findById(id);
       if(!project){
        throw new Error("No project found !!");
       }
       if(project.client.toString() !== req.user._id.toString()){
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
        message : "Updated Successfully!!"
       })
    }
    catch(err){
       res.json({
        message : "Error: "+err
       });
    }
});

export default projectRouter;