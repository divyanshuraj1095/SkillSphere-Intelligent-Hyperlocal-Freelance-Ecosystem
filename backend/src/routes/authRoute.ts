import express, { Request, Response } from "express";
const authRouter = express.Router();
const Freelancer = require('./models/freelancer.ts')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
});

authRouter.post('/login', async(req : Request, res : Response)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
           throw new Error("All fields are required!");
        }
        const user = await Freelancer.findOne({email : email});
        if(!user){
           throw new Error("User not found");
        }
        const valid = bcrypt.compare(password)
        if(!valid){
           throw new Error('Invalid credentials');
        }

        const token = jwt.sign({email}, process.env.JWT_TOKEN as string, {expiresIn : "5d"});

        res.cookie("token", token);

        res.json({
            message : "Login Successful"
        })
        }
        catch(err){
            res.status(400).json({
                message : "Error: "+err
            });
        }
});

authRouter.post('/logout', async(req : Request, res : Response)=>{
    res.clearCookie("token")
    res.json({
        message : "Logout Successful"
    })
});