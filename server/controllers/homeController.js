const mongoose = require("mongoose");
const User = require("../models/userModel");
const Bus = require("../models/busModel");
const Path = require("../models/pathModel");
const Trip = require("../models/tripModel");
const Seat = require("../models/seatModel");
const Booking = require("../models/bookingModel");
const Ticket = require("../models/ticketModel");

const allTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      isFilled: false,
      date: { $gte: new Date() },
    });
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
      pathIds = paths.map((path) => path._id);
    }
    let tripQuery = {
      ...(date && { date: date }),
      isFilled: false,
    };
    if (pathIds.length > 0) tripQuery.Path = { $in: pathIds };
    const trips = await Trip.find(tripQuery);
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
      seats: [...seats],
    };
    return res.status(200).send({ status: 200, result: result });
  } catch (err) {
    console.log(err.toString());
    return res.status(500).send({ status: 500, error: err.toString() });
  }
};

const confirmTickets = async (req, res) => {
  try {
    const { seats, date, tripId, busId, pathId } = req.body;
    console.log(seats, date, tripId, busId, pathId, "from req.bodyyyy");
    let userId = req.user._id;
    const user = await User.findById(userId);
    const booking = await Booking.create({
      bookedAt: new Date(date),
      noOfSeats: seats.length,
      status: "paid",
      user: user,
      trip: tripId,
    });
    let totalAmount = 0;
    const promises = seats.map(async (seat) => {
      const ticket = await Ticket.create({
        passengerName: seat.name,
        passengerAge: seat.age,
        seat: seat.seatId,
      });
      await Seat.findByIdAndUpdate(
        seat.seatId,
        { status: "Booked" },
        { new: true }
      );
      totalAmount += seat.price;
      return ticket._id;
    });

    const ticketIds = await Promise.all(promises);
    booking.tickets.push(...ticketIds);
    booking.totalAmount = totalAmount;
    await booking.save();
    const openSeats = await Seat.find({ status: "open",trip: tripId });
    if(openSeats.length <= 0){
      const trip = await Trip.findById(tripId);
      trip.isFilled = true;
      await trip.save();
    }
    if (ticketIds) {
      return res
        .status(200)
        .send({ status: 200, message: "tickets booked successfully" });
    }
    return res.status(400).send({ status: 400, message: "error occured" });
  } catch (err) {
    console.log(err.toString());
    return res.status(500).send({ status: 500, error: err.toString() });
  }
};

const myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    console.log(bookings)
    const results = await Promise.all(
      bookings.map(async (booking) => {
        const trip = await Trip.findById(booking.trip);
        const bus = await Bus.findById(trip.Bus);
        const path = await Path.findById(trip.Path);
        const totalAmount = booking.totalAmount;
        return {
          booking: booking,
          trip: trip,
          path: path,
          bus:bus,
          totalAmount: totalAmount,
        };
      })
    );
    console.log(results)
    return res.status(200).send({ status: 200, results: results });
  } catch (err) {
    console.log(err.toString());
    return res.status(500).send({ status: 500, error: err.toString() });
  }
};

const getTickets = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);
    const ticketsArr = booking.tickets
    const results = await Promise.all(
      ticketsArr.map(async (ticket) => {
        const ticket_obj = await Ticket.findById(ticket);
        const seat_obj = await Seat.findById(ticket_obj.seat);
        return {
          ticket:ticket_obj,
          seat: seat_obj,
        };
      })
    );
    console.log(results,"results");
    return res.status(200).send({ status: 200, results: results });
  } catch (err) {
    console.log(err.toString());
    return res.status(500).send({ status: 500, error: err.toString() });
  }
};
module.exports = { allTrips, searchTrips, getSeats, confirmTickets, myBookings ,getTickets};
