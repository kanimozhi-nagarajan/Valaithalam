snippet of signUp logic 

const {firstName,lastName,email} = req.body;

const user = new User({
    firstName,
    lastName,
    email,
    password:hashedPassword
});

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token",token,
        {
            expires:new Date(Date.now() + 24 * 60 * 60 * 1000)
        }
    );
   res.json({message:"user signup details saved successfully",
    data:user
   });

const { adminAuth ,userAuth} = require('./middleware/auth');


app.post("/user/login",async(req,res)=>{

    const {email,password} = req.body;

    try{
        const user = await User.findOne({email:email})
        if(!user){
            throw new Error("Invalid credentials");
        }
        
        const isPasswordValid = await bcrypt.compare(password,user.password)

        
        if(isPasswordValid){

           const token = await jwt.sign({ _id: user._id  }, "samplesecretkey",{ expiresIn: '1d' });

            // res.cookie("token","sadfghjkliuHGJKHkyghfgjk")
            res.cookie("token",token);
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

app.get("/user/profile",userAuth,async (req,res)=>
{
  
    try{
    //       const cookies = req.cookies;

    // const {token} = cookies

    // if(!token){
    //     throw new Error("Unauthorized");  
    // }

    // const decodedMessage = jwt.verify(token,"samplesecretkey")

    // const {_id} = decodedMessage;

    // console.log(_id);

    // const user = await User.findById(_id);

    // if(!user){
    //     throw new Error("Unauthorized");
    // }

    //    console.log(cookies);

        const user = req.user;
        res.send(user); 
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Error :" + err.message);
    }
})

   or
        const userObj =
    {
        firstName:"Nagarajan",
        lastName:"Alagapan",
        email:"nagarajanalagapan@gmail.com",
        password:"password",
        age:52
    }
  
    const user = new User(userObj);
    await user.save();
    res.send("user signup details saved successfully");

//use try and catch to handle errors gracefully

app.get("/user/login",(req,res)=>{
    res.send("user login");
})

app.get("/user/getAllUsers" ,userAuth,(req, res) => {
try{
//  throw new error("abcd");    
    res.send("All users");
}catch(err){
    console.log(err);
    res.status(500).send("Something went wrong Contact Admin for support");
}
   
});

app.get("/admin/getAllUsers" ,userAuth,(req, res) => {

    throw new error("abcd");    
    res.send("All users");
});

app.use("/",(err,req,res,next)=>{
if(err){
    // console.log(err);
    res.status(500).send("Something went wrong");
}
});

app.use("/admin",adminAuth);

app.get("/admin/getAllUsers" ,(req, res) => {
    res.send("All users");
});

app.delete("/admin/deleteUser", (req, res) => {
    res.send("User deleted");
});



app.use("/admin",(req,res,next)=>{
    console.log("Admin middleware");
const token ="token";
const isAuthenticated = token==="token";
if(!isAuthenticated){
     res.status(401).send("Unauthorized");
}
else {
   next();
}
});

app.get("/admin/getAllUsers", (req, res) => {
    res.send("All users");
});

app.delete("/admin/deleteUser", (req, res) => {
    res.send("User deleted");
});

app.get("/admin/getAllUsers", (req, res) => {
    const token ="token12";
    const isAuthenticated = token==="token";
    if(isAuthenticated){
         res.send("All users");
    }
    else {
        res.status(401).send("Unauthorized");
    }
}); 

app.get("/admin/deleteUser", (req, res) => {
    const token ="token";
    const isAuthenticated = token==="token";
    if(isAuthenticated){
         res.send("User deleted");
    }
    else {
        res.status(401).send("Unauthorized");
    }
}); 

app.delete("/admin/deleteUser", (req, res) => {
    res.send("User deleted");
});

app.get("/user",(req,res,next)=>{
    // res.send("Response!");
    next();
},
    (req,res,next)=>{
        // res.send("Response2!");
        next();
    },
    (req,res,next)=>{
        res.send("Response3!");
        next();
    }
);

userRouter.patch("/user/password",async(req,res)=>{

    const userId = req.body.userId
    const data = req.body

    const ALLOWED_UPDATE_FIELDS =[
        "userId","firstName","lastName","gender","age","skills","about","photoURL"]

    const isValidated = Object.keys(data).every((k)=>
        ALLOWED_UPDATE_FIELDS.includes(k));

    if(!isValidated){
        // res.status(400).send("Invalid update"); has to be handled in catch block so

        throw new Error("Invalid update")
    }

    if(data?.skills?.length>10){
        throw new Error("Too many skills");
    }

    try{

        const user = await User.findByIdAndUpdate(userId,data,{
            runValidators:true
        })
        if(user.length===0){

            res.status(404).send("User not found");
        }
        else{
            res.send("User updated successfully");
            }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Update failed"+ err.message
        );
    }
})


userRouter.patch("/user/edit",async(req,res)=>{

    const userId = req.body.userId
    const data = req.body

    const ALLOWED_UPDATE_FIELDS =[
        "userId","firstName","lastName","gender","age","skills","about","photoURL"]

    const isValidated = Object.keys(data).every((k)=>
        ALLOWED_UPDATE_FIELDS.includes(k));

    if(!isValidated){
        // res.status(400).send("Invalid update"); has to be handled in catch block so

        throw new Error("Invalid update")
    }

    if(data?.skills?.length>10){
        throw new Error("Too many skills");
    }

    try{

        const user = await User.findByIdAndUpdate(userId,data,{
            runValidators:true
        })
        if(user.length===0){

            res.status(404).send("User not found");
        }
        else{
            res.send("User updated successfully");
            }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Update failed"+ err.message
        );
    }
})

userRouter.get("/user/view",userAuth,async (req,res)=>{
    const user = req.user;
    const email = req.user.email
    try{
   const users = await User.find({email:email});
   if(users.length===0){
   throw new Error("User not found");
   }
   else{
        res.send(users);
   }

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Error :" + err.message );
    }
})

userRouter.delete("/user", async (req,res)=>{

    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId)
        if(!user){
            res.status(404).send("User not found");
        }
        else{
            res.send("User deleted successfully");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }

})

connectionRequestRouter.post("/sendingConnectionRequest",userAuth, async(req,res)=>{
    try
{
     const user = req.user;

     console.log("Sending connection request");

     res.send("Connection request sent" + user);
}
catch(err)
{
    console.log(err);
    res.status(500).send("Error :" + err.message);
}
})

userRouter.get("/user/feed",async (req,res)=>{

    try{
     const users = await User.find()
    res.send(users);
     }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
})

// works for express 4
// ***********************
// app.get('/abc?d',(req,res)=>{
//     res.send({"name":"Kanimozhi","age":20,"location":"Chennai"});
// });

// app.get('/ab+:c', (req, res) => {
//     res.send("Matched /abbbc or /abc");
// })
// ***********************


//works for express 5 like this
// research more on regex pattern used in express 5
app.get('/ab{c}d', (req, res) => {
    res.send("Matched /ab or /abc");
});

app.get(/^\/a+b(.*)$/, (req, res) => {
  const matchedPart = req.params[0]; // capture group from regexp
  res.send(`Matched one or more b's, extra: ${matchedPart}`);
});

app.get("/abc/:id/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({"name":"Kanimozhi","age":20,"location":"Chennai"});
});

app.get("/user",(req,res)=>{
    res.send({"name":"Kanimozhi","age":20,"location":"Chennai"});
});

app.post("/user",(req,res)=>{
    res.send("User created");
});

app.use("/user",(req,res)=>{
    res.send({"name":"Kanimozhi","age":20,"location":"Chennai"});
})

app.use("/listen",(req,res)=>{
    res.send("Listening to port 7777");
});

app.use("/test",(req,res)=>{
    res.send("Health route test");
});

app.use("/",(req,res)=>{
    res.send("Health");
});


//middleware

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