import express from 'express';
import { initializeSocket } from './socket';
import http from "http"
import connectDB from './config/db';
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

import authUser from "./middlewares/auth.middlewares";
import authorize from "./middlewares/roleAuthorize.middlewares"

import authRouter from "./routes/authRoute";
import projectRouter from "./routes/projectRoute";
import proposalRouter from './routes/propsalRoute';
import gigRouter from "./routes/gigRoute"
import profileRouter from './routes/profileRoute';
import messageRouter from './routes/messageRoute';
import notificationRouter from './routes/notificationRoute';

const app = express();
app.use(express.json())
dotenv.config();

app.use( cors({
        origin : "http://localhost:5173",
        credentials : true
    }))

app.use(cookieParser());    

app.get('/', async (req : any, res : any)=>{
    res.send("Hello World")
})

app.use('/', authUser, authRouter);
app.use('/', authUser , authorize("client"), projectRouter);
app.use('/', authUser, proposalRouter);
app.use('/', authUser, authorize("freelancer"), gigRouter);
app.use('/', authUser, profileRouter);
app.use('/', authUser, messageRouter);
app.use('/', authUser, notificationRouter)


const server = http.createServer(app);
initializeSocket(server);

connectDB()
.then(()=>{
    console.log("Connected to database !!");
    server.listen('7777', ()=>{
    console.log("Listening on PORT 7777");
    })
})
.catch((err:any)=>{
    throw new Error(err);
})
