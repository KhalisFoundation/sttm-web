"use strict";

let express = require("express"),
    pool = require('../config/database'),
    { jwtVerify } = require("../utils/jwt");

const checkFavouriteShabadCallback = async (req, res, data, connection) => {
  const {email, shabad_id} = data;
  const row = await connection.query("SELECT id FROM users where email = ?", [email]);
  const user = row[0]
  const q = "SELECT id FROM favourite_shabads WHERE user_id = ? AND shabad_id = ? LIMIT 1";
  const rows = await connection.query(q, [user.id, shabad_id])
  const isExist = !!rows[0] ?? false
  res.status(200).json({favourite: isExist, shabadId: shabad_id, email});
}    

const addFavouriteShabadCallback = async (req, res, data, connection) => {
  const {email, shabad_id} = data;
  const row = await connection.query("SELECT id FROM users where email = ?", [email]);
  const user = row[0]
  const q = "INSERT INTO favourite_shabads (user_id, shabad_id) VALUES (?,?)";
  const rows = await connection.query(q, [user.id, shabad_id])
  const result = rows.affectedRows ?? false
  res.status(200).json({success: result});
}   

const deleteFavouriteShabadCallback = async (req, res, data, connection) => {
  const {email, shabad_id} = data;
  const row = await connection.query("SELECT id FROM users where email = ?", [email]);
  const user = row[0]
  const q = "DELETE FROM favourite_shabads WHERE user_id = ? AND shabad_id = ?";
  const rows = await connection.query(q, [user.id, shabad_id])
  console.log(rows)
  const result = rows.affectedRows ?? false
  res.status(200).json({success: result});
}   

const favouriteShabad = async (req, res) => {
  const shabadId = req.params.shabadId;
  const bearerToken = req.headers.authorization;
  const token = bearerToken.substr(7);
  const {email} = jwtVerify(token)
  
  pool.runQuery(
    req, 
    res, 
    {email, shabad_id: shabadId}, 
    checkFavouriteShabadCallback
  )
}

const addFavouriteShabad = (req, res) => {
  const shabadId = req.params.shabadId;
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
  server.get('/favourite-shabad/:shabadId', favouriteShabad);  
  server.post('/favourite-shabad/:shabadId', addFavouriteShabad);  
  server.delete('/favourite-shabad/:shabadId', deleteFavouriteShabad);  
}