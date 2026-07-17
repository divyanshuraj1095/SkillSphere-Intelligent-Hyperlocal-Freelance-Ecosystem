import { Request } from "express";
import { IUser } from "../models/User";

export interface authRequest extends Request {
    user?: IUser;
}