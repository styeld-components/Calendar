const { Client, Pool } = require('pg');

// const connectionString = 'postgresql://localhost/calendar';
const config = require('./postgres_config.js');

// const client = new Client(config);
// client.connect(err => err ? console.log(err) : console.log('postgres is connected!'));

const pool = new Pool(config);
pool.connect(err => err ? console.log(err) : console.log('postgres pool is connected!'));


// module.exports = client;
module.exports = pool;