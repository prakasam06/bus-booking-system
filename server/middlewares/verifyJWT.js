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
  console.log(authHeader,"authHeader");
  const token =  authHeader.split(" ")[1];
  console.log(token,"token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, decoded) => {
    if (err)
      return res.status(403).send({ status:403,message: "error occured", error: err });
    if (!validateUser(decoded.id))
      return res
        .status(403)
        .send({ status:403,message: "invalid token - user not found" });
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  });
};

module.exports = { verifyJWT };
