const express = require('express');
const connectDB = require("./config/database")
const cookieParser = require('cookie-parser');
const app = express();
const cors = require("cors")
const http = require("http");
const path = require('path');

require("dotenv").config();

const allowedOrigins = [
    "http://localhost:5173",            
    "https://devtinder.yashwant.xyz"   
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'));
        }
    },
    credentials: true,
}));

// --- The rest of your file remains the same ---
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user")
const paymentRouter = require("./routes/payment");
const initializeSocket = require('./utils/socket');
const chatRouter = require('./routes/chat')

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

// For all other routes, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

connectDB()
.then(() => {
    console.log("Database connection established...");
    server.listen(5000, () => {
    console.log("Server is successfully listening on port 5000...")
});
})
.catch(err => {
    console.log("Databse cannot be connected!!");
    console.error(err);
})