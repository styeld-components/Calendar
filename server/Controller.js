const Models = require('./Models.js');

function getAllBookings(req, res) {
  const { listing_id } = req.params;
  Models.getAllBookings(listing_id, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      // console.log('controller data', data);
      res.status(201).send(data);
    }
  });
}

function updateBooking(req, res) {
  console.log('must add update functionality -_____-');
}

function reserveBooking(req, res) {
  Models.reserveBooking(req, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201)
    }
  });
}

function deleteBooking(req, res) {
  console.log('must add delete functionality -_____-');
}

module.exports = {
  getAllBookings,
  updateBooking,
  reserveBooking,
  deleteBooking
}