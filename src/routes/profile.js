const express = require('express');

const profileRouter = express.Router();

const {userAuth} = require('../middleware/auth');

const {editValidator} = require('../utils/validators');

profileRouter.get("/profile/view",userAuth,async (req,res)=>
{
  
    try{
        const user = req.user;
        res.json({
            message:"Profile fetched successfully",
            data:user
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Profile Error :" + err.message);
    }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
try{
    if(!editValidator(req)){
        throw new Error("Invalid edit requests");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((k)=>{
        loggedInUser[k] = req.body[k];
    })

    await loggedInUser.save();

    res.json({
        message:"${loggedInUser.firstName} profile updated successfully",
    })
}
catch(err){
    console.log(err);
    res.status(500).send("Profile Edit Router Error :" + err.message);
}
    
})


profileRouter.patch("/profile/edit/password",userAuth,async(req,res)=>{
try{


    const loggedInUser = req.user;

    // loggedInUser.password = req.body.password

    // await loggedInUser.save();

    res.json({
        message:"${loggedInUser.firstName} password updated successfully",
    })
}
catch(err){
    console.log(err);
    res.status(500).send("Profile Password Edit Router Error :" + err.message);
}
    
})

module.exports = profileRouter