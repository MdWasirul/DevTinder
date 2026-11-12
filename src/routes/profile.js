const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");


//profile api
profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }

});

//Update data of the user.
profileRouter.patch("/user/:userId", async (req, res) => {
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

module.exports = profileRouter;