const express = require("express");
const app = express();

// app.use("/user", (req, res) => {
//     res.send("Hahahahahahahah");
// })

//this will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({ firstName: "Akshay", lastName: "saini" });
});
app.post("/user", (req, res) => {
    //saving data to DB
    res.send("Data Successfully saved to the database");
});
app.delete("/user", (req, res) => {
    res.send("Data deleted Successfully");
})
//this will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
    res.send("Hello from the Server");
});
app.listen(3000, () => {
    console.log("Server is Successfully listening on port no 3000....");
});