const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");
app.use(express.json()); //convert json obj to JS object.
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



connectDB().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server is Successfully listening on port no 3000....");
    });
}).catch((err) => {
    console.error("Database cannot be connected!!" + err.message);
});
