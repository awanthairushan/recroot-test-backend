const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username is already exits"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password Date is required"]
    },
    profilePictureName: {
        type: String,
        required: [true, "Profile Picture is required"]
    },
})

module.exports = mongoose.model("user", userSchema);