const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");
const mongoose = require("mongoose");

const handleTokens = async function (id) {
  const userId = id;
  const ACCESS_TOKEN = jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );
  const REFRESH_TOKEN = jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  try {
    const usr = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { refreshToken: REFRESH_TOKEN } },
      { new: true }
    );
    tokens = { refreshToken: REFRESH_TOKEN, accessToken: ACCESS_TOKEN };
    return tokens;
  } catch (err) {
    console.log("error:", err);
    throw err;
  }
};

module.exports = { handleTokens };
