const express = require('express');
const path = require('path');
const clientRouter = express.Router();
const {allTrips,searchTrips,getSeats} = require('../controllers/homeController')

clientRouter.get('/trips',allTrips);
clientRouter.post('/search',searchTrips);
clientRouter.get('/book/:tripId',getSeats);

module.exports = {clientRouter};