const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writer = csvWriter();

writer.pipe(fs.createWriteStream('./listings.csv'));
//change to correct size for actual seeding!!!
for (var i = 0; i < 1000; i += 1) {
  writer.write({
    nightly_fee = nightly_fee: Math.ceil(Math.random() * 300) + 60,
    cleaning_fee: Math.ceil(Math.random() * 60) + 20,
    occupancy_tax_rate: (Math.round((Math.random()*.05)*1000)/1000) + .08,
    avg_rating: Math.round((Math.random() * 5) * 100)/100,
    reviews: (Math.floor(Math.random() * 1000)),
    city: faker.address.city(),
    max_capacity: Math.ceil(Math.random() * 9) + 1
  });
}

writer.pipe(fs.createWriteStream('./listings.csv'));
//change to correct size for actual seeding!!!
for (var i = 0; i < 5; i += 1) {
  writer.write({
    checkin: faker.date.between('2020-08-08', '2020-08-10'),
    checkout: faker.date.between('2020-08-10', '2020-08-15'),
    adults: Math.floor(Math.random() * 3) + 1
  });
}


