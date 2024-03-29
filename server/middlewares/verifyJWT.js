const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

const validateUser = async (id) => {
  const user = await User.findOne({ _id: id });
  if (!user) return false;
  return true;
};

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "unauthorized" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).send({ message: "error occured", error: err });
    req.user = decoded.id;
    if (!validateUser(decoded.id))
      return res
        .status(403)
        .send({ message: "invalid token - user not found" });
    next();
  });
};

module.exports = { verifyJWT };
