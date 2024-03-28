const express = require('express');
const path = require('path');
const {sendMail} = require('../controllers/notificationController')
const Notificationrouter = express.Router();


Notificationrouter.post('/email',sendMail);


module.exports = {Notificationrouter};