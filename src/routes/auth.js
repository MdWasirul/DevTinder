const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData, validateLoginData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
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
module.exports = authRouter;