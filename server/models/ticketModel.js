const mongoose = require("mongoose");
const Seat = require("./seatModel");

const ticketSchema = new mongoose.Schema({
  passengerName: {
    type: String,
    required: [true, "passenger name is required for tickets"],
  },
  email: {
    type: String,
    required: [true, "passenger email is required"],
  },
  passengerAge: {
    type: Number,
    min: [1, "age should be greater than 1"],
    required: [true, "age is required for an passenger"],
  },
  seat: {
    type: mongoose.Schema.ObjectId,
    ref: "Seat",
    required: [true, "seat is required"],
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
