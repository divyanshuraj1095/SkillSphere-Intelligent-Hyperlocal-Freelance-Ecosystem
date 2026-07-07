import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv'
import authRouter from "./routes/authRoute";
import authUser from "./middlewares/auth.middlewares";
import authorize from "./middlewares/roleAuthorize.middlewares"
import projectRouter from "./routes/projectRoute";
import proposalRouter from './routes/propsalRoute';

const app = express();
dotenv.config()

app.use('/', async (req : any, res : any)=>{
    res.send("Hello World")
})

app.use('/', authUser, authRouter);
app.use('/', authUser, authorize("client"), projectRouter);
app.use('/', authUser, proposalRouter);


connectDB()
.then(()=>{
    console.log("Connected to database !!");
    app.listen('7777', ()=>{
    console.log("Listening on PORT 7777");
    })
})
.catch((err:any)=>{
    throw new Error(err);
})
