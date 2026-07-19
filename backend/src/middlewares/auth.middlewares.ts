import jwt from "jsonwebtoken"
import express, {Response, NextFunction } from "express";
import User from "../models/User";
import { authRequest } from "../types/authRequest";

export interface JwtPayload {
    _id : string,
    role : "client" | "admin" | "freelancer"
}


const authUser = async(req : authRequest, res : Response, next: NextFunction)=>{
    try{
        const {token} = req.cookies;

        if(!token){
          throw new Error("INVALID!!");
        }

        const verify = jwt.verify(token, process.env.JWT_TOKEN as string) as JwtPayload;

        const {_id} = verify;
        const user = await User.findById(_id);

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

export default authUser;