const jwt = require('jsonwebtoken');

const User = require('../models/user');

const userAuth = async(req, res, next) => {
    try{
    const cookies = req.cookies;

    const {token} = cookies;

    if(!token){
        throw new Error("Unauthorized");
    }

    const decodedData = jwt.verify(token,"samplesecretkey");

    const {_id} = decodedData;
    
    const user = await User.findById(_id);

    req.user = user;
    next();
    }
    catch(err){
        console.log(err);
        res.status(500).send("User Auth Middleware Error : " + err.message  );
    }
}

module.exports = {userAuth}

