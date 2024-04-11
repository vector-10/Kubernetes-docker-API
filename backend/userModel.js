const mongoose = require("mongoose");
const validator = require("validator");
// creating a mongoose model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email addres"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password to register"],
  },
});

module.exports = mongoose.model("User", userSchema);
