const mongoose = require("mongoose");

const pathSchema = new mongoose.Schema({
  departure: {
    type: String,
    required: [true, "departure location is required"],
  },
  destination: {
    type: String,
    required: [true, "destination location is required"],
  },
});

module.exports = mongoose.model("Path", pathSchema);
