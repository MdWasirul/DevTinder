const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 100,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    age: {
        type: Number,
        min: 18,
        required: true,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        },
        required: true,
    },
    photoUrl: {
        type: String,

    },
    about: {
        type: String,
        default: "This is default about the user!",
        maxLength: 200,
        required: true,
    },
    skill: {
        type: [String],
        required: true,
        validate: {
            validator: (skills) => skills.length >= 1 && skills.length <= 10,
            message: "Skills must contain between 1 and 10 items.",
        },
    }

}, {
    timestamps: true,
})
const User = mongoose.model("User", userSchema);
module.exports = User;