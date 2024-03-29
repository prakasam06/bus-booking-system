const userSchema = require("../models/userModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { handleTokens } = require("../helpers/handleTokens");

const signUp = async (req, res) => {
  console.log("in user signup controller");
  const data = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    confirmPassword: req.body.confirmPassword,
  };
  if (data.password !== data.confirmPassword) {
    return res.status(500).send({ error: "Passwords does not match" });
  } else {
    try {
      await User.create(data);
      return res.status(200).json({ message: "User created successfully" });
    } catch (err) {
      res.status(500).json({ error: `404 Not found,${err}` });
    }
  }
};

const signIn = async (req, res) => {
  const body = {
    email: req.body.email,
    password: req.body.password,
  };
  const user = await User.findOne({ email: body.email });

  if (!user) {
    return res.status(400).send({ message: `User not registered` });
  }

  const isMatch = await user.comparePassword(body.password, user.password);
  if (!isMatch) {
    return res.status(400).send({ mesage: "invalid credentials" });
  } else {
    const tokens = await handleTokens(user.id);
    res.cookie("jwt", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ accessToken: tokens.accessToken });
  }
};

const auth = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(400).send({ message: "no cookie" });
  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken: refreshToken });

  if (!user) return res.status(403).send({ message: `User not found` });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(400).send({ error: err });
    if (user.id !== decoded.id)
      return res(403).send({ message: "not a valid ref token" });
    const ACCESS_TOKEN = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    return res.status(200).json({ accessToken: ACCESS_TOKEN });
  });
};

const signOut = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const user = User.findOne({ refreshToken: refreshToken });
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    { $set: { refreshToken: null } },
    { new: true }
  );

  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};

const pagebro = (req, res) => {
  return res.status(200).json({ message: "hello vrooooooooooo" });
};

module.exports = { signUp, signIn, auth, signOut, pagebro };
