const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists"],
  },
  image: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "firstName is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    enum: {
      values: ["Admin", "User"],
      message: "{VALUE} is not supported",
    },
    default: "User",
  },
  refreshToken: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  clientPassword,
  userPassword
) {
  return await bcrypt.compare(clientPassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
