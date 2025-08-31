const validator = require('validator');

const signUpValidator = (req)=>{

    const {firstName,lastName,email,password} = req.body;

    if (!firstName || !lastName ){
     throw new Error("Invalid name");
    }
    else if(!validator.isEmail(email)) {
        throw new Error("Invalid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Invalid password");
    }
   }

const editValidator = (req)=>{
    
    allowedEditFields = [
        "firstName",
        "lastName",
        "email",
        "gender",
        "age",
        "skills",
        "about",
        "photoURL"
    ]

    const isEditAllowed = Object.keys(req.body).every((k)=>
        allowedEditFields.includes(k)
    );

    return isEditAllowed;
}
   module.exports = {signUpValidator,editValidator}