const fs = require('fs');
const faker = require('faker');

const { paymentType, creditCardNum, range } = require('../db_Helpers/SeedingHelpers.js');

const totalListings = 10000000;
const totalBookings = 50000000;
const totalBillings = 50000000;


const writeBookingsByListings = fs.createWriteStream('./db_cassandra/bookingsByListing.csv');
writeBookingsByListings.write('listing_id,nightly_fee,cleaning_fee,occupancy_tax_rate,avg_rating,reviews,city,max_capacity,booking_id,checkin,checkout,adults,children,infants,payment_type,first_name,last_name,billing_id,CCNum\n', 'utf8');

function bookingsByListingGen(i, writer, encoding, callback) {
  let listing_id = 1;
  let booking_id = 1;
  let nightly_fee = Math.ceil(Math.random() * 300) + 60;
  let cleaning_fee = Math.ceil(Math.random() * 60) + 20;
  let occupancy_tax_rate = ((Math.round((Math.random()*.05)*1000)/1000) + .08).toString().slice(0, 4);
  let avg_rating = Math.round((Math.random() * 5) * 100)/100;
  let reviews = (Math.floor(Math.random() * 1000));
  let city = faker.address.city();
  let max_capacity = Math.ceil(Math.random() * 9) + 1;
  function write() {
    let ok = true;
    do {
      i -= 1;
      if (booking_id % 5 === 0) {
        listing_id += 1;
        let nightly_fee = Math.ceil(Math.random() * 300) + 60;
        let cleaning_fee = Math.ceil(Math.random() * 60) + 20;
        let occupancy_tax_rate = ((Math.round((Math.random() * .05) * 1000) / 1000) + .08).toString().slice(0, 4);
        let avg_rating = Math.round((Math.random() * 5) * 100) / 100;
        let reviews = (Math.floor(Math.random() * 1000));
        let city = faker.address.city();
        let max_capacity = Math.ceil(Math.random() * 9) + 1;
      }
      booking_id += 1;
      const checkin = faker.date.between('2020-08-08', '2020-08-10');
      const checkout= faker.date.between('2020-08-10', '2020-08-15');
      const adults = range(1, 7);
      const children = range(1, 5);
      const infants = range(0, 3);
      const payment_type = paymentType();
      const first_name = faker.name.firstName();
      const last_name= faker.name.lastName();
      const billing_id = range(1, totalBillings);
      const CCNum =  creditCardNum();
      //data line
      const data = `${listing_id},${nightly_fee},${cleaning_fee},${occupancy_tax_rate},${avg_rating},${reviews},${city},${max_capacity},${booking_id},${checkin},${checkout},${adults},${children},${infants},${payment_type},${first_name},${last_name},${billing_id},${CCNum}\n`

      if (booking_id % 100000) {
        console.log('dun, dun, dun, another 100k bookings bites the...csv', booking_id);
      }
      if (listing_id % 100000) {
        console.log('dun, dun, dun, another 100k listings bites the...csv', listing_id);
      }
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
  // see if we should continue, or wait
  // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write()
}


bookingsByListingGen(totalBookings, writeBookingsByListings, 'utf-8', () => {
  writeBookingsByListings.end();
});

