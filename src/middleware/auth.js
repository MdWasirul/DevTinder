const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        //read token
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token is not valid!!!!!");
        }
        //validate token
        const decodeObj = await jwt.verify(token, "DevTinder@#123");
        const { _id } = decodeObj;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found .")
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("ERROR is : " + err.message);
    }

}
module.exports = {
    userAuth
}