const mongoose = require("mongoose");
const Bus = require("../models/busModel");

const addBus = async (req, res) => {
  try {
    let structureQuantity = 0;
    const { capacity, name, seatStructure } = req.body;
    seatStructure.forEach((obj) => {
      structureQuantity += obj.quantity;
    });
    if (structureQuantity > capacity) {
      return res.status(400).send({
        status: 400,
        message:
          "seats count given in the structure is greater than the capacity of the bus",
      });
    }
    console.log(JSON.stringify(seatStructure));
    const body = {
      name: name,
      capacity: capacity,
      seatStructure: JSON.stringify(seatStructure),
    };
    await Bus.create(body);
    return res
      .status(200)
      .send({ status: 200, message: `bus - ${name} created sucessfully` });
  } catch (error) {
    return res.status(400).send({ message: "error occured", error: error });
  }
};

const editBus = async (req, res) => {
  const busId = req.params.busId;
  const bus = await Bus.findOne({ _id: busId });
  if (!bus) return res.status(400).send({ message: "Bus not found" });
  if (!req.body.action)
    return res.status(400).send({ message: "action is required" });
  if (req.body.action == "edit") {
    console.log(req.body);
    if (req.body.seatStructure) {
      let capacity;
      if (req.body.capacity) {
        capacity = req.body.capacity;
      } else {
        capacity = bus.capacity;
      }

      let structureQuantity = 0;
      req.body.seatStructure.forEach((obj) => {
        structureQuantity += obj.quantity;
      });
      if (structureQuantity > capacity) {
        return res.status(400).send({
          status: 400,
          message:
            "seats count given in the structure is greater than the capacity of the bus",
        });
      }

      req.body.seatStructure = JSON.stringify(req.body.seatStructure);
    }
    const newBus = await Bus.findOneAndUpdate(
      { _id: busId },
      { $set: req.body },
      { new: true }
    );
    console.log(newBus);
    res.status(200).send({ status: 200, message: "edited sucessfully" });
  } else if (req.body.action == "delete") {
    const deletedBus = await Bus.findByIdAndDelete(busId);
    if (!deletedBus) return res.status(400).send({ message: "bus not found" });
    return res.status(200).send({ message: "deleted successfully" });
  }
};

const busDetails = async (req, res) => {
  try {
    const busId = req.params.busId;
    const bus = await Bus.findOne({ Bus: busId });
    if (!bus)
      return res.status(400).send({ message: "bus not found", status: 400 });
    return res.status(200).send({ status: 200, details: bus });
  } catch (error) {
    return res.status(400).send({ status: 500, error: error.toString() });
  }
};

module.exports = { addBus, editBus, busDetails };
