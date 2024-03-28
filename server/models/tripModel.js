const mongoose = require("mongoose");
const Bus = require("./busModel");
const Path = require("./pathModel");

const tripSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "date of the trip is required"],
  },
  Bus: {
    type: mongoose.Schema.ObjectId,
    ref: "Bus",
    required: [true, "Bus is required"],
  },
  Path: {
    type: mongoose.Schema.ObjectId,
    ref: "Path",
    required: [true, "Path is required"],
  },
  departureAt: {
    type: Date,
  },
  reachesAt: {
    type: Date,
  },
  isFilled: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Trip", tripSchema);
