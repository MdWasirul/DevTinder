const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middleware/auth");
//Handle auth Middleware for all GET, POST,....request.
app.use("/admin", adminAuth);

app.get("/user/data", userAuth, (req, res) => {
    // console.log("getting user.....");
    res.send("User Data Sent");
})
app.get("/admin/getAllData", (req, res) => {
    //Logic of checking if the request is authorized
    res.send("All data sent");
});
//another handler for delete user
app.get("/admin/deleteUser", (req, res) => {
    //logic of checking if the request is authorized.
    res.send("deleted a user");
});
app.listen(3000, () => {
    console.log("Server is Successfully listening on port no 3000....");
});