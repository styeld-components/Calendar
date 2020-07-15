const fs = require('fs');
const csvWriter = require('csv-write-stream');
const cliProgress = require('cli-progress');
const faker = require('faker');

const listingsBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const bookingsBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const billingsBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const totalListings = 10000000;
const totalBookings = 50000000;
const totalBillings = 50000000;

//Seed Listings
const listingsGen = () => {
  var j = 0;
  let count = 0;
  listingsBar.start(4, 0);

  while (j < 4) {
    const writer = csvWriter();
    let fileNum = j + 1;
    writer.pipe(fs.createWriteStream(`./db_postgres/csv/listings${fileNum}.csv`));
    //change to correct size for actual seeding!!!
    for (var i = 0; i < totalListings; i += 1) {
      writer.write({
        listing_id: count + i,
        nightly_fee: Math.ceil(Math.random() * 300) + 60,
        cleaning_fee: Math.ceil(Math.random() * 60) + 20,
        occupancy_tax_rate:  ((Math.round((Math.random()*.05)*1000)/1000) + .08).toString().slice(0, 4),
        avg_rating: Math.round((Math.random() * 5) * 100)/100,
        reviews: (Math.floor(Math.random() * 1000)),
        city: faker.address.city(),
        max_capacity: Math.ceil(Math.random() * 9) + 1
      })
    }
    writer.end();
    listingsBar.increment();
    count += totalListings;
    j += 1;
  }
  listingsBar.stop();
}


//Seed Bookings
const guestRange = (min, max) => Math.floor((Math.random() * (max - min)) + min);

const writeBookings = fs.createWriteStream('./db_postgres/csv/bookings.csv');
writeBookings.write('id,checkin,checkout,adults,children,infants,listing_id,billingInfo\n', 'utf8');

function bookingsGen(i, writer, encoding, callback) {
  // let i = 50;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const checkin = faker.date.between('2020-08-08', '2020-08-10');
      const checkout= faker.date.between('2020-08-10', '2020-08-15');
      const adults = guestRange(1, 7);
      const children =  guestRange(1, 5);
      const infants = guestRange(0, 3);
      const listing_id = faker.random.number(totalListings) + 1;
      const billingInfo = faker.random.number(totalBillings) + 1;
      const data = `${id},${checkin},${checkout},${adults},${children},${infants},${listing_id},${billingInfo}\n`;
      if (id % 100000 === 0) {
        console.log('dun dun dun, another 100k bites the....bookingscsv', id);
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


// const bookingsGen = () => {
//   var j = 0;
//   let count = 0;
//   bookingsBar.start(4, 0);

//   while (j < 4) {
//     const writer = csvWriter();
//     let fileNum = j + 1;
//     writer.pipe(fs.createWriteStream(`./db_postgres//csv/bookings${fileNum}.csv`));
//     //change to correct size for actual seeding!!!
//     for (var i = 0; i < totalBookings; i += 1) {
//       writer.write({
//         booking_id: count + i,
//         checkin: faker.date.between('2020-08-08', '2020-08-10'),
//         checkout: faker.date.between('2020-08-10', '2020-08-15'),
//         adults: guestRange(1, 7),
//         children: guestRange(1, 5),
//         infants: guestRange(0, 3),
//         listing_id: faker.random.number(totalListings) + 1,
//         billingInfo: faker.random.number(totalBillings) + 1
//       })
//     }
//     writer.end();
//     bookingsBar.increment();
//     count += totalBookings;
//     j += 1;
//   }
//   bookingsBar.stop();
// }



const paymentType = () => {
  const types = ['cash', 'credit card', 'debit card', 'check', 'reward points', 'bitcoin', 'contact-less payment'];
  return types[Math.round((Math.random()*7)) - 1];
}

const creditCardNum = () => {
  let cardNum = '';
  const randNum = () => Math.floor(Math.random() * Math.floor(9));

  while (cardNum.length < 16) {
    let num = randNum();
    cardNum += num;
  }
  return cardNum;
}


const writeBillingInfo = fs.createWriteStream('./db_postgres/csv/billingsInfo.csv');
writeBillingInfo.write('id,first_name,last_name,payment_type,CCNum\n', 'utf8');

function billingsGen(i, writer, encoding, callback) {
  // let i = 50e6;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const first_name = faker.name.firstName();
      const last_name= faker.name.lastName();
      const payment_type = paymentType();
      const CCNum =  creditCardNum();

      const data = `${id},${first_name},${last_name},${payment_type},${CCNum}\n`;
      if (id % 100000 === 0) {
        console.log('dun dun dun, another 100k bites the....billingscsv', id);
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

// const billingGen = () => {
//   var j = 0;
//   let count = 0;
//   billingsBar.start(4, 0);
//   while (j < 4) {
//     const writer = csvWriter();
//     let fileNum = j + 1;

//     writer.pipe(fs.createWriteStream(`./db_postgres/csv/billingInfo${fileNum}.csv`));
//     //change to correct size for actual seeding!!!

//     for (var i = 0; i < totalBillings; i += 1) {
//       writer.write({
//         billing_id: count + i,
//         first_name: faker.name.firstName(),
//         last_name: faker.name.lastName(),
//         payment_type: paymentType(),
//         CCNum: creditCardNum()
//       });
//     }
//     writer.end();
//     billingsBar.increment();
//     count += totalBillings;
//     j += 1;
//   }
//   billingsBar.stop();
// }

listingsGen();

bookingsGen(totalBookings, writeBookings, 'utf-8', () => {
  writeBookings.end();
});

billingsGen(totalBillings, writeBillingInfo, 'utf-8', () => {
  writeBillingInfo.end();
});
