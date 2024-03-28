const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name for the bus is required"],
  },
  capacity: {
    type: Number,
    required: [true, "capacity of the bus should be given"],
    min: 10,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Bus", busSchema);
