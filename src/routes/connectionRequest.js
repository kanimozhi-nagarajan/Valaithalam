const express = require('express'); 

const connectionRequestRouter = express.Router();

const {userAuth }= require('../middleware/auth')

connectionRequestRouter.post("/sendingConnectionRequest",userAuth, async(req,res)=>{
    try
{
     const user = req.user;

     console.log("Sending connection request");

     res.send("Connection request sent" + user);
}
catch(err)
{
    console.log(err);
    res.status(500).send("Error :" + err.message);
}
})

module.exports = connectionRequestRouter