const express = require('express');
const path = require('path');
const clientRouter = express.Router();
const {verifyJWT} = require('../middlewares/verifyJWT');
const {allTrips,searchTrips,getSeats,confirmTickets,myBookings,getTickets} = require('../controllers/homeController')

clientRouter.get('/trips',allTrips);
clientRouter.post('/search',searchTrips);
clientRouter.get('/book/:tripId',getSeats);
clientRouter.post('/confirm-tickets',verifyJWT,confirmTickets);
clientRouter.get('/myBookings',verifyJWT,myBookings);
clientRouter.get('/getTickets/:bookingId',verifyJWT,getTickets);

module.exports = {clientRouter};