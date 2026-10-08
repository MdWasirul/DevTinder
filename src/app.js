const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.send("This is Dashboard page");
});
app.get("/hello", (req, res) => {
    res.send("Hello hello hello from server");
});
app.get("/test", (req, res) => {
    res.send("Hello from the Server");
});
app.listen(3000, () => {
    console.log("Server is Successfully listening on port no 3000....");
});