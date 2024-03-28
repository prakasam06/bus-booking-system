const mongoose = require("mongoose");
const Seat = require("./seatModel");
const Trip = require("./tripModel");

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
  trip: {
    type: mongoose.Schema.ObjectId,
    ref: "Trip",
    required: [true, "trip is required"],
  },
});

module.exports = mongoose.Model("Ticket", ticketSchema);
