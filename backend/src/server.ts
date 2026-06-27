const express = require('express')
const connectDB = require('./config/db.ts');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRoute.ts')

const app = express();
dotenv.config()

app.use('/', async (req : any, res : any)=>{
    res.send("Hello World")
})

app.use('/', authRouter);


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
