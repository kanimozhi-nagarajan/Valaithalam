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
                default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAACUCAMAAAAu5KLjAAAAMFBMVEXk5ueutLfo6uu7wMOrsbTHy82xt7qnrrHBxsjR1Na3vb/c3+Dg4+TKztDX2tzN0dNrpq4NAAAD5UlEQVR4nO2b25arIAxAJSLKpfj/f3uibWc6ndpCoolnFvtl5q17BRK5hK5rNBqNRqPRaDQajUaj8TcB6LqUurT8B9oyGwDEPA9Tj0zTxed0RlNIl94Z+4UxLszduUQh+TCi2RN2DPk8ptBd3PjL8Spq+/kkYw/e/Q7kt6hx+QSeEPs3kivjlLRF34fyHtEQlT0vnyVXUa9qOZVZ4sBf9OIJxZYYTz3PCkuM56DjWRPLNZ5ewxP8RknfRKWA5kpJDKdL8pofq/oLz146nDDUWypMz0ixNCbIDnttln+FcxbVrM+fO6LhJAYTwylZ5BPVEounnCV1Zq7hnMXCCWTJpXaKWdITCHFRSpMx5oIr5ET4Tj5oTkKTMzqGJY66kGbmBBPXx0IVvnCbtqmZZTRZGSS2KwJWBiEyOQS8DMLVnEwOcTWFUp055k2zaR7Ff5LpEJiaMrt1bnmX2g6RThIeNIW2GXPtGddPRqHlO2uPgdGUsewiL4eEPumkw7iHYA5ClnDhBNMKrYpxz8bRlDuU43yHxDaWlGP3ByQP4OnhFMvzBfLmUmpbeYV6omCDpCXWJGI4ha9YackumOY3zUxJdit/f0U4+xjlToq/qf6y20leEj+ZtcMufHd1o/psW8US8TWSTq0tpSrdFbuRIBe09yxYp9qKBDGUeNpeuWEKUkH9FNtXvBPNHwJqwxma5DCgg9kWHc1pujihG8xLU2vcrN7G9wCkuXdPjabWusmfJZJ3oIt5CuM4ri27+DcMOZ5N8gZAyt7P3sdT9j9fgSe0fX6xSKW8tJOv/eRLR/kw+xzPYosSKebLFOxtVn7nzzpBR9cPOaekaYsR9MMUzGjf1PfF1/XTHFVE8TfjEMzrcvmqgBo3SffALxNxeC6Tnxlt7+WCChBxLpL26cv4y1R8/N4UrjE3VYd0tCnEgSe5ippjpykuLvmSV9H+sMUdLtiqs2absT8korhY2yeSdzCi++81izdnVaI7bz5wUvJu1rZEd+0xL3rGQmTHo0Rm49Fb7E6nIYVbcQZ7HCdCLlxd0Nnhgh3moyXNDh2ytMcC9Z6BVerJFxbVnqx4ysRy9QzkYwexWF49iZqsC1SCJ3HcmS0d9Z60usRt3qr3JHzg4ehvzyvP6tYfkbL+i+rpyextJ1L96unIRdE7qq64aPe7O1D3dpDd+0inItt18melqsj3WpZIeVFivg1hUX7pznu2xPYsjqamZfEDXPCqmqX95qCZQAuFJV7lO/lA0ajznifuQNm6E2Ztzb5k1IX2vG8oawRSrZoLRe9ak8Ky/SdFi/h0u3bUIxS1oj5f5MpTYtloNP4e/wC/sjJ2BOvQwwAAAABJRU5ErkJggg==",
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

