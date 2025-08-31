const express = require('express'); 

const userRouter = express.Router();

const User = require('../models/user');

const ConnectionRequest = require('../models/connectionRequest');

const {userAuth} = require('../middleware/auth')

const USER_DATA = "firstName lastName age gender skills about photoURL";

userRouter.get("/user/requests/received",userAuth,
    async(req,res)=>{
        try{

           const loggedInUser = req.user

           const connectionRequestsReceived = await ConnectionRequest.find({
               toUserId:loggedInUser._id,
               status:"interested"
           }).populate("fromUserId",USER_DATA);

            const data = connectionRequestsReceived

            res.json({
                message:"Connections requests received fetched successfully",
                data,
            })
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send("Error" + err.message);
        }
    }
)


userRouter.get("/user/connections",userAuth,
    async(req,res)=>{
        try{

           const loggedInUser = req.user

           const connections = await ConnectionRequest.find({
            $or:[{
                fromUserId:loggedInUser._id,
                status:"accepted"
            },
            {
                toUserId:loggedInUser._id,
                status:"accepted"
            }]
           }).populate("fromUserId",USER_DATA)
            .populate("toUserId",USER_DATA);

            const data = connections.map((connections)=>{
                if(connections.fromUserId._id.toString() === loggedInUser._id.toString()){
                    return connections.toUserId;
                }
                else{
                    return connections.fromUserId;
                }
            })

            res.json({
                message:"Connections fetched successfully",
                data,
            })
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send("Error" + err.message);
        }
    }
)



userRouter.get("/user/feed",userAuth,
    async(req,res)=>{
        try{
             const loggedInUser = req.user

             const page = req.query.page || 1;
             let limit = req.query.limit || 10;

             limit = limit > 50 ? 50 : limit;
             const skip = (page - 1) * limit;

             const connections = await ConnectionRequest.find({
                $or:[{
                  fromUserId:loggedInUser._id,
                },
                {
                  toUserId:loggedInUser._id
                }]
             }).select("toUserId fromUserId")


             const hideConnectionsIds = new Set();

             connections.forEach((connections)=>{
                hideConnectionsIds.add(connections.fromUserId.toString());
                hideConnectionsIds.add(connections.toUserId.toString());
             })

             const users = await User.find({
                 $and:[
                    {
                     _id :{
                        $nin: Array.from(hideConnectionsIds)
                     }
                 },
                 {
                     _id: {
                        $ne: loggedInUser._id
                     }
                 }]
             }).select(USER_DATA)
             .limit(limit)
             .skip(skip);

             const data = users           

            res.json({
                message:"User feed fetched successfully",
                data,
            })
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send("Error" + err.message);
        }
    }
)

module.exports = userRouter