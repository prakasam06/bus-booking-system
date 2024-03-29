const mongoose = require("mongoose");
const Trip = require("./tripModel");

const seatSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.ObjectId,
    ref: "Trip",
    required: [true, "trip is required"],
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

module.exports = mongoose.model("Seat", seatSchema);
