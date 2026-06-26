const express = require('express')

const app = express();

app.use('/', async (req : any, res : any)=>{
    res.send("Hello World")
})

app.listen('7777', ()=>{
    console.log("Listening on PORT 7777");
})