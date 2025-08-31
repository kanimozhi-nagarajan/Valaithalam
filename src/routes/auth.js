const express = require('express'); 

const authRouter = express.Router();

const User = require('../models/user');

const userAuth = require('../middleware/auth')

const bcrypt = require('bcrypt');


const {signUpValidator} = require('../utils/validators');

authRouter.post("/signup",async(req,res)=>{
   try{
    //Validation
    signUpValidator(req);

    
    //password hashing
    const {password} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);
       const user = new User({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      password:hashedPassword
   });

     const savedUser =  await user.save();

     res.json({message:"user signup details saved successfully",
     data:savedUser
   });

// const {firstName,lastName,email} = req.body;

// const user = new User({
//     firstName,
//     lastName,
//     email,
//     password:hashedPassword
// });

//     const savedUser = await user.save();
//     const token = await savedUser.getJWT();

//     res.cookie("token",token,
//         {
//             expires:new Date(Date.now() + 24 * 60 * 60 * 1000)
//         }
//     );
//    res.json({message:"user signup details saved successfully",
//     data:user
//    });


   }
   catch(err){
    console.log(err);
    res.status(500).send("Error: " + err.message);
   }
})

authRouter.post("/login",async(req,res)=>{

    const {email,password} = req.body;

    try{
        const user = await User.findOne({email:email})
        if(!user){
            throw new Error("Invalid credentials");
        }
        
        const isPasswordValid = await user.comparePassword(password);
        
        if(isPasswordValid){

            const token = await user.getJWT();

            res.cookie("token",token,
                {
                    expires:new Date(Date.now() + 24 * 60 * 60 * 1000)
                }
            );
            res.send("Login successful");
        }
        else{
            throw new Error("Invalid credentials");
        }
    
    }
    catch(err){
        console.log(err);
        res.status(500).send("Invalid login: "+ err.message);
    }
})


authRouter.post("/logout", async(req,res)=>{
    try{
        // res.clearCookie("token");

        // or
        res.cookie("token",null,{expires: new Date(Date.now())});
        res.send("Logout successful");

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Logout Error :" + err.message);
    }
})

module.exports = authRouter