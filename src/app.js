const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const { validateSignUpData, validateLoginData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth.js");

app.use(express.json()); //convert json obj to JS object.
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    //add that JS obj on to .body
    try {
        //validation of data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password, age, gender, about, skill, photoUrl } = req.body;

        //Encrypt the password. using bcrypt 
        const passwordHash = await bcrypt.hash(password, 10);
        // console.log(passwordHash);

        // Creating new instance of the user Model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            age,
            gender,
            about,
            skill,
            photoUrl
        });
        await user.save();
        res.send("User data Successfully added!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }

})
//login api
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        validateLoginData(emailId, password);
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials!");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            //Create a token.
            const token = await user.getJWT();
            //Add the token to cookie and send the response back to user.
            res.cookie("token", token, { expires: new Date(Date.now() + 10 * 86400000) });
            res.send("Login Successful!!!");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})
//profile api
app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }

});
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    //sending connection request.
    console.log("Sending the connection Request.");
    res.send(user.firstName + " sent the connect request.");
})
//get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    // console.log(userEmail);
    try {
        const user = await User.findOne({ emailId: userEmail });
        if (!user) {
            res.status(404).send("User not found!");
        } else {
            res.send(user);
        }
        //     const users = await User.find({ emailId: userEmail });
        //     if (users.length === 0) {
        //         res.status(404).send("User not found");
        //     } else {
        //         res.send(users);
        //     }

    } catch (error) {
        res.status(400).send("Something went wrong");

    }

})
//Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);

    } catch (error) {
        res.status(400).send("Something went wrongs");

    }
})
//Delete a user from the database.
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        // const user = await User.findByIdAndDelete({ _id: userId }) //same below
        const user = await User.findByIdAndDelete(userId);
        res.send("User Delete Successfully");
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }

})
//Update data of the user.
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    // console.log(data);
    try {
        const ALLOWED_UPDATE = ["photoUrl", "age", "about", "gender", "skill"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k));

        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }
        if (data?.skill?.length > 10) {
            throw new Error("Skill cannot more than 10.");
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true,
        });
        // console.log(user);
        res.send("User data updated successfully");
    } catch (err) {
        res.status(400).send("UPDATE FAILED:" + err.message);
    }

});
connectDB().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server is Successfully listening on port no 3000....");
    });
}).catch((err) => {
    console.error("Database cannot be connected!!" + err.message);
});
