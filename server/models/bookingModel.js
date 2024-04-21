const mongoose = require("mongoose");
const Trip = require("./tripModel");
const Ticket = require("./ticketModel");
const User = require("./userModel");

const bookingSchema = new mongoose.Schema({
  bookedAt: {
    type: Date,
    default: Date.now(),
  },
  noOfSeats: {
    type: Number,
    min: 1,
    required: [true, "no of seats is required"],
  },
  status: {
    type: String,
    enum: ["cancelled", "paid", "hold"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "user is required"],
  },
  trip: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "trip is required"],
  },
  totalAmount: {
    type: Number,
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      
    },
  ],
});

module.exports = mongoose.model("Booking", bookingSchema);
