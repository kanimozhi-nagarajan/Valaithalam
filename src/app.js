const express = require('express');

const app = express();

const {connectDB} = require('./config/database')

const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');

const connectionRequestRouter = require('./routes/connectionRequest');

const profileRouter = require('./routes/profile');

const userRouter = require('./routes/user');

const cors = require('cors');

const { FRONT_END_URL } = require('./utils/constants');

app.use(cors({
    // origin:"http://localhost:5173",
        origin: FRONT_END_URL,

    credentials:true
}));

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
