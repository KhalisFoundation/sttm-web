"use strict";

let pool = require('../config/database'),
    { jwtVerify } = require("../utils/jwt");

const checkFavouriteShabadsCallback = async (_req, res, data, connection) => {
  const {email} = data;
  const row = await connection.query("SELECT id FROM users where email = ?", [email]);
  const user = row[0]
  const q = "SELECT * FROM favourite_shabads WHERE user_id = ?";
  const rows = await connection.query(q, [user.id])
  const favouriteShabads = rows ?? []
  res.status(200).json({favouriteShabads});
}    

const addFavouriteShabadCallback = async (_req, res, data, connection) => {
  const {email, shabad_id} = data;
  const row = await connection.query("SELECT id FROM users where email = ?", [email]);
  const user = row[0]
  console.log(email, shabad_id,'email - shabad id....');
  const shabadId = await connection.query('SELECT shabad_id from favourite_shabads where user_id = ?')
  
  let rows = [];
  if(shabadId) {
    const q = "UPDATE favourite_shabads set comment = ? where shabad_id = ?"
    rows = await connection.query(q, ["Some test comment while updating the comment next time....",shabad_id]);
  }else {
    const q = "INSERT INTO favourite_shabads (user_id, shabad_id, comment) VALUES (?,?)";
    rows = await connection.query(q, [user.id, shabad_id, "Some test comment...."])
  }
  
  const result = await connection.query("SELECT * from favourite_shabads WHERE id = ?", [rows.insertId])
  res.status(200).json(result[0]);
}   

const deleteFavouriteShabadCallback = async (_req, res, data, connection) => {
  const {email, shabad_id} = data;
  const row = await connection.query("SELECT id FROM users where email = ?", [email]);
  const user = row[0];
  const q = "DELETE FROM favourite_shabads WHERE user_id = ? AND shabad_id = ?";
  const rows = await connection.query(q, [user.id, shabad_id])
  const result = rows.affectedRows ? shabad_id : false
  res.status(200).json({shabadId: result});
}   

const getFavouriteShabads = async (req, res) => {
  const shabadId = req.params.shabadId;
  const bearerToken = req.headers.authorization;
  const token = bearerToken.substr(7);
  const {email} = jwtVerify(token)
  
  pool.runQuery(
    req, 
    res, 
    {email, shabad_id: shabadId}, 
    checkFavouriteShabadsCallback
  )
}

const addFavouriteShabad = (req, res) => {
  const shabadId = req.body.shabadId;
  const bearerToken = req.headers.authorization;
  const token = bearerToken.substr(7);
  const {email} = jwtVerify(token)

  pool.runQuery(
    req, 
    res, 
    {email, shabad_id: shabadId}, 
    addFavouriteShabadCallback
  )
}

const deleteFavouriteShabad = (req, res) => {
  const shabadId = req.params.shabadId;
  const bearerToken = req.headers.authorization;
  const token = bearerToken.substr(7);
  const {email} = jwtVerify(token)

  pool.runQuery(
    req, 
    res, 
    {email, shabad_id: shabadId}, 
    deleteFavouriteShabadCallback
  )
}

module.exports = function(server) {  
  server.get('/favourite-shabads', getFavouriteShabads);  
  server.post('/favourite-shabads', addFavouriteShabad);  
  server.delete('/favourite-shabads/:shabadId', deleteFavouriteShabad);  
}
