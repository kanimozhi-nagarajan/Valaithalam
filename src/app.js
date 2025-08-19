const express = require('express');

const app = express();

app.use("/listen",(req,res)=>{
    res.send("Listening to port 7777");
})

app.use("/test",(req,res)=>{
    res.send("Health route test");
})

app.use("/",(req,res)=>{
    res.send("Health");
})

app.listen(7777,()=>{
    console.log("Server is listening at 7777");
});