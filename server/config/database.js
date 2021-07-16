// Setup Mariadb
const mariadb = require('mariadb');

const pool = mariadb.createPool({host: process.env.MARIADB_HOST, port: process.env.MARIADB_PORT, user: process.env.MARIADB_USERNAME, password: process.env.MARIADB_PASSWORD, database: process.env.MARIADB_DATABASE});

async function asyncFunction(cb) {
  let conn;
  try {
    conn = await pool.getConnection();
    cb(conn);    
  } catch (err) {
    throw err;
  } finally {
    conn.end();
  }
}

module.exports = {
  pool,
  asyncFunction
}