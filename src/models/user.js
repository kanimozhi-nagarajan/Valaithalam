const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minlength: 4,
        maxlength:50
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
                    if(!validator.isEmail(value)){
            throw new Error("Invalid email" + value )
        }
        }

    },
    password:{
        type: String,
        required: true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid password" + value )
            }
        }

    },
    age:{
        type: Number,
        min:18
    },
    gender:{
        type: String,
        validate(value){
            if(!["male"||"female"||"transgender"].includes(value)){
                throw new Error("Invalid gender")
            } 
        }
    },
    photoURL:{
        type:String,
       default:"https://www.flaticon.com/free-icon/user_7249485?term=no+profile&page=1&position=5&origin=tag&related_id=7249485",
                validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL");
            }
        }
    },
    about:{
        type:String,

    },
    skills:{
        type:[String]
    },
    },
    {
    timestamps:true
    })

module.exports = mongoose.model("User",UserSchema);

