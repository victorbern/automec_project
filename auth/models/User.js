const mongoose = require("mongoose");

const User = mongoose.model("User", {
    name: String,
    email: String,
    password: String,
    token: String,
});

module.exports = User;
