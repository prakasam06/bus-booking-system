const mongoose = require("mongoose");
const Bus = require("../models/busModel");
const Path = require("../models/pathModel");
const Trip = require("../models/tripModel");

const addTrip = async (req, res) => {
  try {
    const { Bus, Path, date } = req.body;
    const isTrip = await Trip.findOne(
      { date: new Date(date) },
      { Bus: Bus },
      { Path: Path }
    );
    if (!isTrip) {
      req.body.date = new Date(date);
      await Trip.create(req.body);
      return res.status(200).send({ status: 200, message: `Trip is created` });
    }
    return res
      .status(400)
      .send({ status: 400, message: "Trip already exists" });
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "error occured", error: err.toString() });
  }
};

const editTrip = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const trip = await Trip.findById(tripId);
    let { Bus, Path, date, type } = req.body;
    console.log(date, new Date(date));
    if (!trip)
      return res.status(400).send({ status: 400, message: "no trip found" });
    if (!type)
      return res.status(400).send({ status: 400, message: "type is required" });
    if (type == "edit") {
      const isTrip = await Trip.findOne(
        { date: new Date(date) },
        { Bus: Bus },
        { Path: Path }
      );
      if (isTrip)
        return res.status(400).send({
          status: 400,
          message: "a trip with the bus and path already exists",
        });
      req.body.date = new Date(req.body.date);
      console.log(req.body.date);
      const newTrip = await Trip.findOneAndUpdate(
        { _id: tripId },
        { $set: req.body },
        { new: true }
      );
      console.log($`trip updated`);
      return res
        .status(200)
        .send({ status: 200, message: "trip updated sucessfully" });
    } else if (type == "delete") {
      await Trip.findByIdAndDelete(tripId);
      return res.status(200).send({ status: 200, message: "trip is deleted" });
    }
  } catch (err) {
    console.log(err.stack);
    return res.status(500).send({ status: 500, error: err.toString() });
  }
};

const tripDetails = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const trip = await Trip.findById(tripId);
    if (!trip)
      return res.status(400).send({ status: 400, message: "no trip found" });
    const data = {};
    const bus = await Bus.findById(trip.Bus);
    const path = await Path.findById(trip.Path);
    data.bus = bus;
    data.path = path;
    data.date = trip.date;
    return res.status(200).send({ status: 200, details: data });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).send({ status: 500, error: err.toString() });
  }
};

module.exports = { addTrip, editTrip, tripDetails };
