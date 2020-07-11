const Calendar = require('../database/Calendar.js');
const faker = require('faker');


const find = function (req, res) {
  const placeID = req.params.placeID;
  Calendar.find({ id: placeID })
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

const patch = function (req, res) {
  const placeID = req.params.placeID;
  const obj = req.body;
  Calendar.update({ id: placeID }, { $push: { bookings: obj } })
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

const create = function (req, res) {
  Calendar.find().sort({id:-1}).limit(1)
  .then((data)=> {
    let sample = {
      id: data[0].id+1,
      nightly_fee: Math.ceil(Math.random() * 300) + 60,
      cleaning_fee: Math.ceil(Math.random() * 60) + 20,
      occupancy_tax_rate: (Math.round((Math.random()*.05)*1000)/1000) + .08,
      avg_rating: Math.round((Math.random() * 5) * 100)/100,
      reviews: (Math.floor(Math.random() * 1000)),
      city: faker.address.city(),
      max_capacity: Math.ceil(Math.random() * 9) + 1,
      bookings: [{
        checkin: faker.date.between('2020-08-08', '2020-08-10'),
        checkout: faker.date.between('2020-08-10', '2020-08-15'),
        guests: {
          adults: 2,
          children: 1,
          infants: 1
        }
      }]
    };
    console.log(sample);
    let newData = new Calendar(sample);
    return newData.save()
  })
  .then(()=> {
    console.log("newdata saved");
    res.sendStatus(200)
  })
  .catch((e)=> {
    console.log("error in post request: "+ e);
    res.sendStatus(400);
  })
};

const del = function (req, res) {
  const placeID = req.params.placeID;
  Calendar.deleteOne({ id: placeID })
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

module.exports = {
  find,
  patch,
  create,
  del
}