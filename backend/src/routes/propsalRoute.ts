import express, {Request, Response} from 'express';
const proposalRouter = express.Router();
import Proposal from '../models/Proposal';
import authorize from '../middlewares/roleAuthorize.middlewares';
import Project from '../models/Project';

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

proposalRouter.post('/proposal/:proposalId/accept', authorize("client"), async(req:Request, res:Response)=>{
    try{
        const loggedUser = req.user;
        const {proposalId} = req.params

        const status = "accepted";
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

        proposal.status = status;
        await proposal.save();

        res.json({
            message : "proposal accepted successfully!!";
        })
    }
    catch(err){
        res.json({
            message : "Error: "+err
        })
    }
});

proposalRouter.post('/proposal/:proposalId/reject', authorize("client"), async(req : Request, res: Response)=>{
    try{

    }
    catch(err){
        
    }
})

export default proposalRouter;