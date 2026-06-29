import jwt from "jsonwebtoken"
import express, { Request, Response, NextFunction } from "express";
const User = require('./models/user.ts')

export interface JwtPayload {
    _id : String,
    role : "client" | "admin" | "freelancer"
}


const authUser = async(req : Request, res : Response, next: NextFunction)=>{
    try{
        const {token} = req.cookies;

        if(!token){
          throw new Error("INVALID!!");
        }

        const verify = await jwt.verify(token, process.env.JWT_TOKEN as string) as JwtPayload;

        const {_id} : any = verify;
        const user = await User.findOne({_id});

        if(!user){
           throw new Error("INVALID!!");
        }   
        req.user = user;
        next();
    }
    catch(err){
        res.status(400).json({
            message : "Error "+err
        })
    }
}