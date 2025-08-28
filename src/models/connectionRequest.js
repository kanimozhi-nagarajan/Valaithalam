const mongoose = require("mongoose")

const User = require("./user")

const connectionRequestSchema = new Schema({

    fromuUserId:{
        type: String,
        required: true,
        ref:"User"
    },
    toUserId:{
        type: String,
        required: true,
        ref:"User"

    },
    status:{
        type:string,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:"{VALUE} is not supported"
        }
    }

},
{
    timestamp:true
}
)

module.export = mongoose.model("ConnectionRequests",connectionRequestSchema)