const express = require("express");
const app = express();
const connectDB = require("./config/database.js");

const User = require("./models/user.js");
app.post("/signup", async (req, res) => {
    //Creating new instance of the user Model
    const user = new User({
        firstName: "Basirul",
        lastName: "Qauadri",
        emailId: "basirul@gmail.com",
        password: "basirul@123"

    });
    try {
        await user.save();
        res.send("User data Successfully added!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }

})

connectDB().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server is Successfully listening on port no 3000....");
    });
}).catch((err) => {
    console.error("Database cannot be connected!!");
});
