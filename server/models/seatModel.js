const mongoose = require("mongoose");
const Bus = require("./busModel");

const seatSchema = new mongoose.Schema({
  bus: {
    type: mongoose.Schema.ObjectId,
    ref: "Bus",
    required: [true, "bus is required"],
  },
  class: {
    type: String,
    required: [true, "class of a seat is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required for a seat"],
    min: [1, "price cant be 0"],
  },
  status: {
    type: String,
    enum: ["selected", "Booked", "open"],
    default: "open",
  },
});

module.exports = mongoose.Model("Seat", seatSchema);
