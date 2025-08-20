const express = require('express');

const app = express();


app.get("/user",(req,res,next)=>{
    res.send("Response!");
    next();
},
    (req,res,next)=>{
        res.send("Response2!");
        next();
    },
    (req,res)=>{
        res.send("Response3!");
    }
);

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

app.listen(7777,()=>{
    console.log("Server is listening at 7777");
});