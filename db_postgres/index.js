const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'jaynein',
  host: 'localhost',
  database: 'calendar',
  password: '',
  port: 3003,
});