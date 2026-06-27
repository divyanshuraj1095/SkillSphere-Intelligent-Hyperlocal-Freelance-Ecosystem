const jwt = require('jsonwebtoken');
import express, { Request, Response } from "express";
const Freelancer = require('./models/freelancer.ts')

const authUser = async(req : Request, res : Response)=>{
    const {token} = req.cookies;

    if(!token){
        throw new Error("INVALID!!");
    }

    const verify = await jwt.verify(token, process.env.JWT_TOKEN as string);

    const {_id} = verify;
    const user = await Freelancer.findOne({_id});

    if(!user){
        throw new Error("INVALID!!");
    }


}