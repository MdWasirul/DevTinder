const express = require("express");
const app = express();

//this will only handle GET call to /user
app.get("/user/:userId/:password/:name", (req, res) => {
    console.log(req.params);
    res.send({ firstName: "Akshay", lastName: "saini" });
});


app.listen(3000, () => {
    console.log("Server is Successfully listening on port no 3000....");
});