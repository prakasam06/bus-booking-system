const mongoose = require("mongoose");
const User = require("../models/userModel");

const addAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { role: "Admin" } },
      { new: true }
    );
    console.log(user.role);

    return res
      .status(200)
      .send({ status: 200, message: "role changed for user" });
  } catch (err) {
    return res
      .status(400)
      .send({ status: 400, error: err, message: "error occured" });
  }
};

module.exports = { addAdmin };
