const fs = require('fs');
const csvWriter = require('csv-write-stream');
const cliProgress = require('cli-progress');
const faker = require('faker');

const multibar = new cliProgress.MultiBar({
  clearOnComplete: false,
  hideCursor: true

}, cliProgress.Presets.shades_classic);

const listings = multibar.create(100000, 0);
const bookings = multibar.create(500, 0);
const billing = multibar.create(300, 0)

// const writer = csvWriter();

const listingsGen = () => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('./db_postgres/listings.csv'));
  //change to correct size for actual seeding!!!
  listings.start(100000, 0);
  for (var i = 0; i < 100000; i += 1) {
    writer.write({
      nightly_fee: Math.ceil(Math.random() * 300) + 60,
      cleaning_fee: Math.ceil(Math.random() * 60) + 20,
      occupancy_tax_rate:  ((Math.round((Math.random()*.05)*1000)/1000) + .08).toString().slice(0, 4),
      avg_rating: Math.round((Math.random() * 5) * 100)/100,
      reviews: (Math.floor(Math.random() * 1000)),
      city: faker.address.city(),
      max_capacity: Math.ceil(Math.random() * 9) + 1
    })
    listings.increment();
  }
  writer.end();
}

const guestRange = (min, max) => Math.floor((Math.random() * (max - min)) + min);

const bookingsGen = () => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('./db_postgres/bookings.csv'));
  //change to correct size for actual seeding!!!
  bookings.start(500, 0);
  for (var i = 0; i < 500; i += 1) {
    writer.write({
      checkin: faker.date.between('2020-08-08', '2020-08-10'),
      checkout: faker.date.between('2020-08-10', '2020-08-15'),
      adults: guestRange(1, 7),
      children: guestRange(1, 5),
      infants: guestRange(0, 3)
    });
    bookings.increment();
  }
  writer.end();
}

const paymentType = () => {
  const types = ['cash', 'credit card', 'debit card', 'check', 'reward points', 'bitcoin', 'contact-less payment'];
  return types[Math.round((Math.random()*7))];
}

const billingGen = () => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('./db_postgres/billingInfo.csv'));
  //change to correct size for actual seeding!!!
  billing.start(300, 0);
  for (var i = 0; i < 300; i += 1) {
    writer.write({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      payment_type: paymentType(),
    });
    billing.increment();
  }
  writer.end();
}

listingsGen();
bookingsGen();
billingGen();

multibar.stop();

