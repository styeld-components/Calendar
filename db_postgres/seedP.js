const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const { paymentType, creditCardNum, range } = require('../db_Helpers/SeedingHelpers.js');

const totalListings = 10000000;
const halfBookings = 50000000;
const totalBillings = 50000000;

//Seed Listings
const writeListings = fs.createWriteStream('./db_postgres/csv/listings.csv');
writeListings.write('listing_id,nightly_fee,cleaning_fee,occupancy_tax_rate,avg_rating,reviews,city,max_occupancy\n', 'utf8');

function listingsGen(i, writer, encoding, callback) {
  let listing_id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      listing_id += 1;
      const nightly_fee = Math.ceil(Math.random() * 300) + 60;
      const cleaning_fee = Math.ceil(Math.random() * 60) + 20;
      const occupancy_tax_rate = ((Math.round((Math.random()*.05)*1000)/1000) + .08).toString().slice(0, 4);
      const avg_rating = Math.round((Math.random() * 5) * 100)/100;
      const reviews = (Math.floor(Math.random() * 1000));
      const city = faker.address.city();
      const max_capacity = Math.ceil(Math.random() * 9) + 1;
      const data = `${listing_id},${nightly_fee},${cleaning_fee},${occupancy_tax_rate},${avg_rating},${reviews},${city},${max_capacity}\n`;
      if (listing_id % 100000 === 0) {
        console.log('dun dun dun, another 100k bites the....listingscsv', listing_id);
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


//Seed Bookings
// const range = (min, max) => Math.floor((Math.random() * (max - min)) + min);

const writeBookings = fs.createWriteStream('./db_postgres/csv/bookings.csv');
writeBookings.write('booking_id,checkin,checkout,adults,children,infants,listing_id,billingInfo\n', 'utf8');

function bookingsGen(i, writer, encoding, callback) {
  // let i = 50;
  let booking_id = 0;
  // let booking_id = 25000001
  function write() {
    let ok = true;
    do {
      i -= 1;
      booking_id += 1;
      const checkin = faker.date.between('2020-08-08', '2020-08-10');
      const checkout= faker.date.between('2020-08-10', '2020-08-15');
      const adults = range(1, 7);
      const children = range(1, 5);
      const infants = range(0, 3);
      const listing_id = range(1, totalListings);
      const billingInfo = range(1, totalBillings);
      const data = `${booking_id},${checkin},${checkout},${adults},${children},${infants},${listing_id},${billingInfo}\n`;
      if (booking_id % 100000 === 0) {
        console.log('dun dun dun, another 100k bites the....bookingscsv', booking_id);
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


//Seed Billing Info

// const paymentType = () => {
//   const types = ['cash', 'credit card', 'debit card', 'check', 'reward points', 'bitcoin', 'contact-less payment'];
//   return types[Math.round((Math.random()*7)) - 1];
// }

// const creditCardNum = () => {
//   let cardNum = '';
//   const randNum = () => Math.floor(Math.random() * Math.floor(9));

//   while (cardNum.length < 16) {
//     let num = randNum();
//     cardNum += num;
//   }
//   return cardNum;
// }

const writeBillingInfo = fs.createWriteStream('./db_postgres/csv/billingsInfo.csv');
writeBillingInfo.write('billing_id,first_name,last_name,payment_type,CCNum\n', 'utf8');

function billingsGen(i, writer, encoding, callback) {
  // let i = 50e6;
  let billing_id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      billing_id += 1;
      const first_name = faker.name.firstName();
      const last_name= faker.name.lastName();
      const payment_type = paymentType();
      const CCNum =  creditCardNum();

      const data = `${billing_id},${first_name},${last_name},${payment_type},${CCNum}\n`;
      if (billing_id % 100000 === 0) {
        console.log('dun dun dun, another 100k bites the....billingscsv', billing_id);
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

listingsGen(totalListings, writeListings, 'utf-8', () => {
  writeListings.end();
});

bookingsGen(halfBookings, writeBookings, 'utf-8', () => {
  writeBookings.end();
});

billingsGen(totalBillings, writeBillingInfo, 'utf-8', () => {
  writeBillingInfo.end();
});
