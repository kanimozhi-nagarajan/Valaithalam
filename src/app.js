const express = require('express');

const app = express();

const {connectDB} = require('./config/database')

// const User = require('./models/user');

// const {signUpValidator} = require('./utils/validators');

// const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser');

// const jwt = require('jsonwebtoken');

// const {userAuth} = require('./middleware/auth');

const authRouter = require('./routes/auth');

const connectionRequestRouter = require('./routes/connectionRequest');

const profileRouter = require('./routes/profile');

const userRouter = require('./routes/user');

app.use(express.json());

app.use(cookieParser());

app.use("/",authRouter);
app.use("/",connectionRequestRouter);
app.use("/",profileRouter);
app.use("/",userRouter);

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
