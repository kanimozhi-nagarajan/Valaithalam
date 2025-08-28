const express = require('express');

const profileRouter = express.Router();

const {userAuth} = require('../middleware/auth');

profileRouter.get("/profile/view",userAuth,async (req,res)=>
{
  
    try{
        const user = req.user;
        res.send(user); 
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Profile Error :" + err.message);
    }
})


module.exports = profileRouter