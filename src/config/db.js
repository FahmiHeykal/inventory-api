const { Pool } = require('pg');
const { dbUrl } = require('./env');

const pool = new Pool({
  connectionString: dbUrl
});

pool.on('connect', () => {
  console.log('Database connected');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect()
};
