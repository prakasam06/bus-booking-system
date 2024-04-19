const mongoose = require("mongoose");
const Bus = require("./busModel");
const Path = require("./pathModel");
const Seat = require("./seatModel");

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
  isFilled: {
    type: Boolean,
    default: false,
  },
});

tripSchema.pre("save", async function (next) {
  try {
    console.log(this);
    const bus = await Bus.findById(this.Bus);
    const structure = JSON.parse(bus.seatStructure);
    console.log(structure);
    for (let i = 0; i < structure.length; i++) {
      let quantity = structure[i].quantity;
      let seatClass = structure[i].class;
      let price = structure[i].price;
      for (let j = 0; j < quantity; j++) {
        await Seat.create({
          trip: this._id,
          class: seatClass,
          price: price,
        });
      }
    }
    console.log("created");
    next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("Trip", tripSchema);
