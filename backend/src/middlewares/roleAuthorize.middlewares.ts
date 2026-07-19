
import { Request, Response, NextFunction } from "express";
import { authRequest } from "../types/authRequest";

const authorize = (...roles : string[])=>{

    return (req : authRequest, res: Response, next:NextFunction)=>{
        if(!roles.includes(req.user!.role)){
            return res.status(403).json({
                message : "Access Denied"
            });
        }
        next();
    }
}

export default authorize;