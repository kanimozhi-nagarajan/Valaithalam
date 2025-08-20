const adminAuth = (req, res, next) => {
    const token = "token";
    const isAuthenticated = token==="token"
    if(!isAuthenticated){
        res.status(401).send("Unauthorized")
    }
    else{
        next();
    }
}

const userAuth = (req, res, next) => {
    const token = "token";
    const isAuthenticated = token==="token"
    if(!isAuthenticated){
        res.status(401).send("Unauthorized")
    }
    else{
        next();
    }
}

module.exports = {adminAuth,userAuth}