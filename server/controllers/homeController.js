const mongoose = require("mongoose");
const Bus = require("../models/busModel");
const Path = require("../models/pathModel");
const Trip = require("../models/tripModel");
const Seat = require("../models/seatModel");

const allTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ isFilled: false });
    const results = await Promise.all(
      trips.map(async (trip) => {
        const bus = await Bus.findById(trip.Bus);
        const path = await Path.findById(trip.Path);
        return {
          tripId: trip._id,
          date: trip.date,
          bus: bus,
          path: path,
        };
      })
    );
    return res.status(200).send({ status: 200, trips: results });
  } catch (err) {
    console.log(err.toString());
    return res.status(500).send({ status: 500, error: err.toString() });
  }
};

const searchTrips = async (req, res) => {
    try {
      const { from, to, date } = req.body;
      let pathIds = [];
      if (from || to) {
        let pathQuery = {};
        if (from) pathQuery.departure = from;
        if (to) pathQuery.destination = to;
        const paths = await Path.find(pathQuery);
        pathIds = paths.map(path => path._id);
      }
      let tripQuery = {
        ...(date && { date: date }), 
        isFilled: false
      };
      if (pathIds.length > 0) tripQuery.Path = { $in: pathIds };
      const trips = await Trip.find(tripQuery);
      const results = await Promise.all(trips.map(async (trip) => {
        const bus = await Bus.findById(trip.Bus);
        const path = await Path.findById(trip.Path);
        return {
          tripId: trip._id,
          date: trip.date,
          bus: bus,
          path: path,
        };
      }));
      return res.status(200).send({ status: 200, trips: results });
    } catch (err) {
      console.log(err.toString());
      return res.status(500).send({ status: 500, error: err.toString() });
    }
  };
  
const getSeats = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const trip = await Trip.findById(tripId);
    const path = await Path.findById(trip.Path);
    const seats = await Seat.find({ trip: tripId });
    const bus = await Bus.findById(trip.Bus);
    const result = {
        trip: trip,
        bus: bus,
        path: path,
        seats: [...seats]
    }
    return res.status(200).send({ status: 200, result: result});
  } catch (err) {
    console.log(err.toString());
    return res.status(500).send({ status: 500, error: err.toString() });
  }
};

module.exports = { allTrips, searchTrips ,getSeats };
