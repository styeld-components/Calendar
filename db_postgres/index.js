const { Client } = require('pg');

// const connectionString = 'postgresql://localhost/calendar';
const config = require('./postgres_config.js');

const client = new Client(config);
client.connect(err => err ? console.log(err) : console.log('postgres is connected!'));


module.exports = client;