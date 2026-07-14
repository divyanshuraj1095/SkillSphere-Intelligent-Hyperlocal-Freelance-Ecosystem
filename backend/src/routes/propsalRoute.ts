import express, {Request, Response} from 'express';
const proposalRouter = express.Router();
import Proposal from '../models/Proposal';
import authorize from '../middlewares/roleAuthorize.middlewares';
import Project from '../models/Project';
import Notification from '../models/Notification';

proposalRouter.post('/makeProposal', authorize("freelancer"), async(req:Request, res:Response)=>{
    try{
        const {projectId, price, deliveryDays, coverLetter, status} = req.body;
        const freelancerId = req.user._id
        if(!projectId || !price || !deliveryDays || !coverLetter){
            throw new Error("Field missing!!");
        }

        const existing = await Proposal.findOne({
            projectId,
            freelancerId
        })

        if(existing){
            throw new Error("Proposal already exists")
        }

        const proposal = await Proposal.create({
            projectId,
            freelancerId,
            price,
            deliveryDays,
            coverLetter,
            status
        });

        const project = await Project.findById(projectId);

        if(!project){
            throw new Error("Project doesnt exist")
        }

        const notification = await Notification.create({
         user: project.client,
         message: `${req.user.name} has submitted a proposal for your project`,
         type: "proposal"
        });

        res.json({
            message : "Proposal made successfully",
            data : proposal
        });
    }
    catch(err){
        res.status(400).json({
            message : "Error: "+err
        })
    }
});

proposalRouter.get('/getProposals', authorize("client"), async(req:Request, res:Response)=>{
    try{
        const proposal = await Proposal.find();
        if(!proposal){
            throw new Error("No proposal found");
        }
        res.json({
            message : "Proposal found successfully !!",
            data : proposal
        })
    }
    catch(err){
        res.json({
            message : "Error: "+err
        })
    }
});

proposalRouter.get('/getProposals/:id', authorize("client"), async(req:Request, res: Response)=>{
    try{
        const {id} = req.params;
        const proposal = await Proposal.findById({id : id});
        if(!proposal){
            throw new Error("No proposal found");
        }
        res.json({
            message : "Proposal found successfully !!",
            data : proposal
        });
    }
    catch(err){
        res.json({
            message:"Error: "+err
        });
    }
});

proposalRouter.patch('/proposal/:proposalId/accept', authorize("client"), async(req:Request, res:Response)=>{
    try{
        const loggedUser = req.user;
        const {proposalId} = req.params

        const proposal = await Proposal.findById({
         _id : proposalId
        });
        
        if(!proposal){
            throw new Error("No request exist");
        }
        const project = await Project.findById(proposal.projectId);
        if(!project){
            throw new Error("project not found!!");
        }
        if(project.client.toString() != req.user._id.toString()){
            res.status(403).send("User Invalid");
        }

        proposal.status = "accepted";
        await proposal.save();

        await Project.findByIdAndUpdate(proposal.projectId, {status : "in-progress"});

        await Proposal.updateMany({
            projectId : proposal.projectId,
            _id : {$ne : proposal._id}
        },{
            status : "rejected"
        })

        res.json({
            message : "Status updated"
        })
    }
    catch(err){
        res.json({
            message : "Error: "+err
        })
    }
});

proposalRouter.patch('/proposal/:proposalId/reject', authorize("client"), async(req : Request, res: Response)=>{
    try{
       const {proposalId} = req.params;

       const status = "rejected";
       const proposal = await Proposal.findById({
        _id : proposalId
       });

       if(!proposal){
        throw new Error("No proposal found");
       }

       const project = await Project.findById(proposal.projectId);
       if(!project){
        throw new Error("Project not found");
       }

       proposal.status = status;
       await proposal.save();

       res.json({
        message : "Rejected!!"
       })
    }
    catch(err){
        res.json({
            message : "Error: "+err
        })
    }
});

proposalRouter.patch('/proposal/:proposalId/update', authorize("freelancer"), async(req : Request, res : Response)=>{
    try{
        const {price, deliveryDays, coverLetter} = req.body;
        const {proposalId} = req.params

        const proposal = await Proposal.findByIdAndUpdate(proposalId, {
           price : price,
           deliveryDays : deliveryDays,
           coverLetter : coverLetter
        });
        if(!proposal){
            throw new Error("no proposal found");
        }
        await proposal.save();
        res.json({
            message : "Proposal updated!!",
            data : proposal
        });
    }
    catch(err){
        res.json({
           message : "Error: "+err
        });
    }
});

export default proposalRouter;