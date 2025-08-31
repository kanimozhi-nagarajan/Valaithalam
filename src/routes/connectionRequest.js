const express = require('express'); 

const connectionRequestRouter = express.Router();

const {userAuth }= require('../middleware/auth')

const ConnectionRequest = require('../models/connectionRequest');

const User = require('../models/user');

connectionRequestRouter.post(
    "/request/send/:status/:userId",
    userAuth,
    async(req,res)=>{
        try{
            const fromUserId = req.user._id;
            const toUserId = req.params.userId;
            const status = req.params.status;

            const allowedStatus =["interested","ignored"];

            if(!allowedStatus.includes(status)){
                throw new Error("Invalid status");
            }

            const toUser = await User.findById(toUserId);

            if(!toUser){
                throw new Error("User not found");
            }

            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or :[
                    {fromUserId,toUserId},
                    {fromUserId:toUserId,toUserId:fromUserId}]
            })
            if(existingConnectionRequest){
                throw new Error("Connection request already exists");
            }

            const connectionRequest =  new ConnectionRequest({
                fromUserId,
                toUserId,
                status,
            })

            const data = await connectionRequest.save();

            res.json({
                message:req.user.firstName+"    " +req.params.status +"    " + toUser.firstName,
                data,
            })
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send("Error in connection request sending  " + err.message);
        }
    }

)

connectionRequestRouter.post(
    "/request/review/:status/:requestId",
    userAuth,
    async(req,res)=>{
        try{

            const loggedInUser = req.user;
            const requestId = req.params.requestId;
            const status = req.params.status;

            const allowedStatus =["accepted","rejected"]

            if(!allowedStatus.includes(status)){
                throw new Error("Invalid status");
            }
            console.log(loggedInUser);console.log(requestId);console.log(status);
            const connectionRequest = await ConnectionRequest.findOne(
                {
                    _id:requestId,
                    toUserId:loggedInUser._id,
                    status:"interested",
                }
            );

            if(!connectionRequest){
                throw new Error("Connection request not found");
            }

            connectionRequest.status = status;

            const data = await connectionRequest.save();
            res.json({
            message:"Connection Request" + req.params.status,
            data,
            })
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send("Error in connection request received" + err.message);
        }
    }

)

module.exports = connectionRequestRouter