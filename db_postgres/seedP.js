const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writer = csvWriter();

writer.pipe(fs.createWriteStream('./listings.csv'));
for (var i = 0; i < 10000000; i += 1) {
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


