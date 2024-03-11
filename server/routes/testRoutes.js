const express = require('express');
const path = require('path');
const {home} = require('../controllers/home');
const testRouter = express.Router();

testRouter.get('^/$|home(.html)?',home)

module.exports = {testRouter};