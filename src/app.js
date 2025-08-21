const express = require('express');

const { adminAuth ,userAuth} = require('./middleware/auth');

const app = express();

const {connectDB} = require('./config/database')

const User = require('./models/user');

app.post("/user/signup",async(req,res)=>{

   const user = new User({
    firstName:"Arulraj",
    lastName:"Nagarajan",
    email:"arulrajnagarajan@gmail.com",
    password:"password",
    age:16
   })

   try{
    await user.save();
   res.send("user signup details saved successfully");
   }
   catch(err){
    console.log(err);
    res.status(500).send("Something went wrong");
   }    
})

connectDB()
.then(()=>{
    console.log("Database connected successfully");

    app.listen(7777,()=>{
    console.log("Server is listening at 7777");
});
})
.catch((err)=>{
    console.log("Database connection failed",err);
})

   // or
    //     const userObj =
    // {
    //     firstName:"Nagarajan",
    //     lastName:"Alagapan",
    //     email:"nagarajanalagapan@gmail.com",
    //     password:"password",
    //     age:52
    // }
  
    // const user = new User(userObj);
    // await user.save();
    // res.send("user signup details saved successfully");

// //use try and catch to handle errors gracefully

// app.get("/user/login",(req,res)=>{
//     res.send("user login");
// })

// app.get("/user/getAllUsers" ,userAuth,(req, res) => {
// try{
// //  throw new error("abcd");    
//     res.send("All users");
// }catch(err){
//     console.log(err);
//     res.status(500).send("Something went wrong Contact Admin for support");
// }
   
// });

// app.get("/admin/getAllUsers" ,userAuth,(req, res) => {

//     throw new error("abcd");    
//     res.send("All users");
// });

// app.use("/",(err,req,res,next)=>{
// if(err){
//     // console.log(err);
//     res.status(500).send("Something went wrong");
// }
// });

// app.use("/admin",adminAuth);

// app.get("/admin/getAllUsers" ,(req, res) => {
//     res.send("All users");
// });

// app.delete("/admin/deleteUser", (req, res) => {
//     res.send("User deleted");
// });



// app.use("/admin",(req,res,next)=>{
//     console.log("Admin middleware");
// const token ="token";
// const isAuthenticated = token==="token";
// if(!isAuthenticated){
//      res.status(401).send("Unauthorized");
// }
// else {
//    next();
// }
// });

// app.get("/admin/getAllUsers", (req, res) => {
//     res.send("All users");
// });

// app.delete("/admin/deleteUser", (req, res) => {
//     res.send("User deleted");
// });

// app.get("/admin/getAllUsers", (req, res) => {
//     const token ="token12";
//     const isAuthenticated = token==="token";
//     if(isAuthenticated){
//          res.send("All users");
//     }
//     else {
//         res.status(401).send("Unauthorized");
//     }
// }); 

// app.get("/admin/deleteUser", (req, res) => {
//     const token ="token";
//     const isAuthenticated = token==="token";
//     if(isAuthenticated){
//          res.send("User deleted");
//     }
//     else {
//         res.status(401).send("Unauthorized");
//     }
// }); 

// app.delete("/admin/deleteUser", (req, res) => {
//     res.send("User deleted");
// });

// app.get("/user",(req,res,next)=>{
//     // res.send("Response!");
//     next();
// },
//     (req,res,next)=>{
//         // res.send("Response2!");
//         next();
//     },
//     (req,res,next)=>{
//         res.send("Response3!");
//         next();
//     }
// );

// // works for express 4
// // ***********************
// // app.get('/abc?d',(req,res)=>{
// //     res.send({"name":"Kanimozhi","age":20,"location":"Chennai"});
// // });

// // app.get('/ab+:c', (req, res) => {
// //     res.send("Matched /abbbc or /abc");
// // })
// // ***********************


// //works for express 5 like this
// // research more on regex pattern used in express 5
// app.get('/ab{c}d', (req, res) => {
//     res.send("Matched /ab or /abc");
// });

// app.get(/^\/a+b(.*)$/, (req, res) => {
//   const matchedPart = req.params[0]; // capture group from regexp
//   res.send(`Matched one or more b's, extra: ${matchedPart}`);
// });

// app.get("/abc/:id/:name/:password",(req,res)=>{
//     console.log(req.params);
//     res.send({"name":"Kanimozhi","age":20,"location":"Chennai"});
// });

// app.get("/user",(req,res)=>{
//     res.send({"name":"Kanimozhi","age":20,"location":"Chennai"});
// });

// app.post("/user",(req,res)=>{
//     res.send("User created");
// });

// app.use("/user",(req,res)=>{
//     res.send({"name":"Kanimozhi","age":20,"location":"Chennai"});
// })

// app.use("/listen",(req,res)=>{
//     res.send("Listening to port 7777");
// });

// app.use("/test",(req,res)=>{
//     res.send("Health route test");
// });

// app.use("/",(req,res)=>{
//     res.send("Health");
// });
