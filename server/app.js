const express = require('express');
const path = require('path');
const cors = require('cors');

const { logger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { corsOptionsDelegate } = require('./middlewares/cors');
const { notFound } = require('./middlewares/notFound');

const { userRouter } = require('./routes/userRoutes');

const app = express();
const port = 8000;

//database connection - mongoose(Object database Modeller) - mongodb
var dotenv = require('dotenv').config({path: path.join(__dirname, '.env')})
const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

const cookieParser = require('cookie-parser');

mongoose.connect(MONGO_URL).then(()=>{
    console.log('Connected to database');
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    })
}).catch((error)=>{
    console.log(error,'error occured while running server/connectiong to databse');
}) 

//middlewares
//custom middleware logger
app.use(cors(corsOptionsDelegate)); //to handle cross origin resource sharing error
app.use(logger);

//built-in middlewares
app.use(express.urlencoded({extended: true})); //to handle form data / url-encoded data
app.use(cookieParser());
app.use(express.json()); //to handle json
app.use(express.static(path.join(__dirname, 'public'))); //to serve static files

//routes
app.use('/api/v1/users', userRouter);

//error handlers
app.all('*',notFound); //to handle 404 error - it is an route handler
app.use(errorHandler) //to handle all other errors - it is an error handler
