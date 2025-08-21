const mongoose = require("mongoose");

const connectDB= async()=>{
    await mongoose.connect (
        "mongodb+srv://KF:SJqi4sskKXng2sSE@sample1.gpj1nbe.mongodb.net/devTinder"
    );
}

module.exports={connectDB}


