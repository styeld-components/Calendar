const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
// const db = require('../database');
const path = require('path');
const cors = require('cors');
const Controller = require('./Controller.js');

// const Calendar = require('../db_postgres/index.js');

const app = express();
const port = 3001;
// const port = 80;

app.use(cors());

app.use(compression());

app.use('/loaderio-f0c4f91c95f5e6cb7a3b90b29cbe5bce.txt', express.static(path.join(__dirname,'../loaderio-f0c4f91c95f5e6cb7a3b90b29cbe5bce.txt')))

app.use('/', express.static(__dirname + '/../client/dist'));
app.use('/listing_id', express.static(__dirname + '/../client/dist'));
app.use('/calendar/', express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));


// get request
// app.get('/api/:placeID', Controller.find);
app.get('/api/:listing_id', Controller.getAllBookings)
// patch request
// app.patch('/api/:placeID/bookings/:bookingID', Controller.patch);
app.patch('/api/:listing_id/bookings/:booking_id', (req, res) => {
  // console.log(req.params);
  // console.log(req);
  Controller.updateBooking(req, res);
})
//post request
// app.post('/api/:placeID/bookings/:bookingID', Controller.create);
app.post('/api/:listing_id/bookings', Controller.reserveBooking);
//delete request
// app.delete('/api/:placeID/bookings/:bookingID',Controller.delete);
app.delete('/api/:listing_id/bookings/:booking_id', (req, res) => {
  Controller.deleteBooking(req, res);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));