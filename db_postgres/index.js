const { Client } = require('pg');

const connectionString = 'postgresql://localhost/calendar';

const client = new Client({
  connectionString,
});
client.connect(err => err ? console.log(err) : console.log('postgres is connected!'));


module.exports = client;