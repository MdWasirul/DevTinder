const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://techbymdwasirul2024_db_user:aslam_devTinder_2026@cluster0.r0zkran.mongodb.net/devTinder");
}

module.exports = connectDB;

