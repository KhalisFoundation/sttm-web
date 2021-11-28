// Setup Mariadb
const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
  host: process.env.MARIADB_HOST, 
  port: process.env.MARIADB_PORT, 
  user: process.env.MARIADB_USERNAME, 
  password: process.env.MARIADB_PASSWORD, 
  database: process.env.MARIADB_DATABASE,
});

const runQuery = async (req, res, data, cb) => {
  let conn;
  try {
      // Establish connection to SkySQL
      conn = await pool.getConnection();
      console.log("connected ! connection id is " + conn.threadId);
      cb(req, res, data, conn)
  } catch (err) {
      throw err;
  } finally {
      // Release (close) the connection 
      if (conn) return conn.release();
  }
}

module.exports = {
  getConnection: async () => pool.getConnection(),
  runQuery
}