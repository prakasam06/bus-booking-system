const mongoose = require("mongoose");
const Trip = require("./tripModel");
const Ticket = require("./ticketModel");
const User = require("./userModel");

const bookingSchema = new mongoose.Schema({
  bookedAt: {
    type: Date,
    default: date.now(),
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
  tickets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: [true, "ticket is required"],
    },
  ],
});

module.exports = mongoose.model("Booking", bookingSchema);
