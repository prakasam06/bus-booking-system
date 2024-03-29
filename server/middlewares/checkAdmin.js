const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

const checkAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "unauthorized" });
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err)
        return res.status(403).send({ message: "error occured", error: err });

      req.user = decoded.id;
      const user = await User.findOne({ _id: decoded.id });
      const role = user.role;
      console.log(role);
      if (role !== "Admin") {
        return res
          .status(403)
          .send({ message: `invalid access - role : ${role}` });
      } else {
        next();
      }
    });
  } catch (err) {
    return res.status(400).send({ message: "error occured", Error: err });
  }
};

module.exports = { checkAdmin };
