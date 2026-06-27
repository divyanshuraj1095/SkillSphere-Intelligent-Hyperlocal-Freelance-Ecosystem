import express, { Request, Response } from "express";
const authRouter = express.Router();
const Freelancer = require('./models/freelancer.ts')
const bcrypt = require('bcrypt');

authRouter.post('/signup', async(req : Request, res : Response)=>{
    try{
        const {name, email, password} = req.body

        if(!name || !email || !password){
           throw new Error("All Fields Required");
        }

        const hashedPass = await bcrypt.hash(password, 10);
    
        const user = new Freelancer({
            name : name,
            email : email,
            password : hashedPass
        });

        await user.save();
        res.json({
            message : "Signup successful"
        })
        }
        catch(err){
            res.json({
                message : "Error: "+err
            });
        }
})