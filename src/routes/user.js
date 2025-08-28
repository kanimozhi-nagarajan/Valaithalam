const express = require('express'); 

const User = require('../models/user');

const {userAuth} = require('../middleware/auth')

const userRouter = express.Router();

userRouter.get("/user/feed",async (req,res)=>{

    try{
     const users = await User.find()
    res.send(users);
     }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
})

userRouter.get("/user/view",userAuth,async (req,res)=>{
    const user = req.user;
    const email = req.user.email
    try{
   const users = await User.find({email:email});
   if(users.length===0){
   throw new Error("User not found");
   }
   else{
        res.send(users);
   }

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Error :" + err.message );
    }
})

userRouter.patch("/user/edit",async(req,res)=>{

    const userId = req.body.userId
    const data = req.body

    const ALLOWED_UPDATE_FIELDS =[
        "userId","firstName","lastName","gender","age","skills","about","photoURL"]

    const isValidated = Object.keys(data).every((k)=>
        ALLOWED_UPDATE_FIELDS.includes(k));

    if(!isValidated){
        // res.status(400).send("Invalid update"); has to be handled in catch block so

        throw new Error("Invalid update")
    }

    if(data?.skills?.length>10){
        throw new Error("Too many skills");
    }

    try{

        const user = await User.findByIdAndUpdate(userId,data,{
            runValidators:true
        })
        if(user.length===0){

            res.status(404).send("User not found");
        }
        else{
            res.send("User updated successfully");
            }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Update failed"+ err.message
        );
    }
})

// userRouter.patch("/user/password",async(req,res)=>{

//     const userId = req.body.userId
//     const data = req.body

//     const ALLOWED_UPDATE_FIELDS =[
//         "userId","firstName","lastName","gender","age","skills","about","photoURL"]

//     const isValidated = Object.keys(data).every((k)=>
//         ALLOWED_UPDATE_FIELDS.includes(k));

//     if(!isValidated){
//         // res.status(400).send("Invalid update"); has to be handled in catch block so

//         throw new Error("Invalid update")
//     }

//     if(data?.skills?.length>10){
//         throw new Error("Too many skills");
//     }

//     try{

//         const user = await User.findByIdAndUpdate(userId,data,{
//             runValidators:true
//         })
//         if(user.length===0){

//             res.status(404).send("User not found");
//         }
//         else{
//             res.send("User updated successfully");
//             }
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send("Update failed"+ err.message
//         );
//     }
// })

userRouter.delete("/user", async (req,res)=>{

    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId)
        if(!user){
            res.status(404).send("User not found");
        }
        else{
            res.send("User deleted successfully");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }

})

module.exports = userRouter