const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = bcrypt.hash(this.password, salt);
  next();
});


module.exports = mongoose.model("Users", userSchema);
