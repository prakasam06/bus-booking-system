const mongoose = require("mongoose");
const Location = require("./locationModel");

const pathSchema = new mongoose.Schema({
  departure: {
    type: mongoose.Schema.ObjectId,
    ref: "Location",
    required: [true, "departure location is required"],
  },
  destination: {
    type: mongoose.Schema.ObjectId,
    ref: "Location",
    required: [true, "destination location is required"],
  },
});

module.exports = mongoose.Model("Path", pathSchema);
