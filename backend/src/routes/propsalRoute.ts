import express, {Request, Response} from 'express';
const proposalRouter = express.Router();
import Proposal from '../models/proposal';
import authorize from '../middlewares/roleAuthorize.middlewares';

proposalRouter.post('/makeProposal', authorize("freelancer"), async(req:Request, res:Response)=>{
    try{
        const {projectId, price, deliveryDays, coverLetter} = req.body;
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
            coverLetter
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
})

export default proposalRouter;