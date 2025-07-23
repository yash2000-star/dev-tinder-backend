const express = require('express');
const connectDB = require("./config/database")
const cookieParser = require('cookie-parser');
const app = express();
const cors = require("cors")
require("dotenv").config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user")
const paymentRouter = require("./routes/payment")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter);
app.use("/", paymentRouter);



connectDB()
.then(() => {
    console.log("Database connection established...");
    app.listen(5000, () => {
    console.log("Server is successfully listening on port 5000...")
});
})
.catch(err => {
    console.log("Databse cannot be connected!!");
    console.error(err);
})

