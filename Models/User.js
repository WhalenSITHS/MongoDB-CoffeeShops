const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a user name!",
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
