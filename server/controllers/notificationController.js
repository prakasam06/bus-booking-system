const mongoose = require("mongoose");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465,
  service: "gmail",
  auth: {
    user: "tripyfytrips@gmail.com",
    pass: "sshg djhk cgcq aihn",
  },
  secure: true,
});

const sendMail = async (req, res) => {
  const { to, subject, text } = req.body;
  const mailData = {
    from: "tripyfytrips@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: "",
  };

  try {
    await transporter.sendMail(mailData);
    res.send({ status: 200, message: "email sent successfully" });
  } catch (err) {
    res.send({ status: 400, message: "error occured", error: err });
  }
};

module.exports = { sendMail };
