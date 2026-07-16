import express, {Request, Response} from "express";
const paymentRouter = express.Router();
import Payment from "../models/Payment";
import Project from "../models/Project";
import Proposal from "../models/Proposal";
import Notification from "../models/Notification";
import razorpay from "../config/razorpay";
import crypto from "crypto"

paymentRouter.post("/payment", async(req: Request, res: Response)=>{
    try{
        const {client, freelancer, project, amount} = req.body;

        const isProject = await Project.findById(project);
        if(!isProject){
            throw new Error("Project not found");
        }

        const acceptedProposals = await Proposal.findOne({
            projectId: project,
            status: "accepted"
        });

        if(!acceptedProposals){
            throw new Error("There is no accepted proposals");
        }

        const options = {
            amount: amount*100,
            currency: "INR",
            receipt: project.toString()
        }

        const razorpayOrder = await razorpay.orders.create(options)

        const payment = await Payment.create({
            client,
            freelancer,
            project,
            amount,
            orderId: razorpayOrder.id,
            status: "pending"
        });

        res.status(200).json({
            message: "Order Created Successfully",
            order: razorpayOrder
        })

    }
    catch(err){
        res.status(400).json({
            message: "Error: "+err
        });
    }
});

paymentRouter.post("/payment/verify", async(req: Request, res: Response)=>{
    try{
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
        const generateSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(
            razorpay_order_id+"|"+ razorpay_payment_id
        )
        .digest("hex");

        if(generateSignature !== razorpay_signature){
            throw new Error("Invalid Payment")
        }

        const payment = await Payment.findOne({
            orderId: razorpay_order_id
        })

        if (!payment) {
            return res.status(404).json({
            message: "Payment not found"
           });
        }

        if (payment.status === "successful") {
            return res.status(400).json({
            message: "Payment already verified"
           });
        }

        payment.paymentId = razorpay_payment_id;
        payment.signature = razorpay_signature;
        payment.status = "successful";

        await payment.save();

        await Project.findByIdAndUpdate(payment.project,{
            status: "in-progress"
        })
        
        await Notification.create({
            user: payment.freelancer,
            message: "Payment successful, Your project has started",
            type:"payment"
        })

        res.status(200).json({
            message: "Payment Successfully",
            payment
        });

    }
    catch(err){
        res.status(400).json({
            message: "Error: "+err
        });
    }
});

paymentRouter.get("/payment", async(req: Request, res: Response)=>{
    try{
        const payments = await Payment.find();
        if(!payments){
            throw new Error("No payments Found");
        }

        res.status(200).json({
            message: "All payments",
            data: payments
        });
    }
    catch(err){
        res.status(400).json({
            message: "Error: "+err
        });
    }
});

paymentRouter.get("/payment/:id", async(req: Request, res: Response)=>{
    try{
        const {id} = req.params;

        const payment = await Payment.findById(id);
        if(!payment){
            throw new Error("No payment found")
        } 

        res.status(200).json({
            message: "Payment fetched successfully",
            data: payment
        })
    }
    catch(err){
        res.status(400).json({
            message: "Error: "+err
        });
    }
});



export default paymentRouter;