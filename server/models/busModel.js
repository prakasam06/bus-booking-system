const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name for the bus is required"],
    unique: [true, "bus name is already taken"],
  },
  capacity: {
    type: Number,
    required: [true, "capacity of the bus should be given"],
    min: 10,
  },
  seatStructure: {
    type: String,
    required: [true, "Seat structure is required"],
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Bus", busSchema);
