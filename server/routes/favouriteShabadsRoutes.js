"use strict";

let pool = require('../config/database'),
    { jwtVerify } = require("../utils/jwt");

const getFavouriteShabadsCallback = async (_req, res, data, connection) => {
  const {email} = data;
  const row = await connection.query("SELECT id FROM users where email = ?", [email]);
  const user = row[0]
  const q = "SELECT * FROM favourite_shabads WHERE user_id = ?";
  const rows = await connection.query(q, [user.id])
  const favouriteShabads = rows ?? []
  res.status(200).json({favouriteShabads});
}    

const addFavouriteShabadCallback = async (_req, res, data, connection) => {
  try {
    const {email, shabadId, comment} = data;
    const row = await connection.query("SELECT id FROM users where email = ?", [email]);
    const user = row[0];
    const favShabad = await connection.query('SELECT * FROM favourite_shabads WHERE shabad_id = ? AND user_id = ?', [shabadId, user.id])
    let rows = [];
    let q = "INSERT INTO favourite_shabads (comment, shabad_id, user_id) VALUES (?,?,?)";
    if(favShabad[0]) {
      q = "UPDATE favourite_shabads SET comment = ? WHERE (shabad_id = ? AND user_id = ?)"    
    }
    rows = await connection.query(q, [ comment, shabadId, user.id])
    const result = await connection.query("SELECT * from favourite_shabads WHERE id = ?", [rows.insertId])
    res.status(200).json(result[0]);
  }catch(err) {
    // console.log(err.message,'ERROR.MESSAGE ADD FAVORITE SHABAD..')
  }
}   

const deleteFavouriteShabadCallback = async (_req, res, data, connection) => {
  const {email, shabadId} = data;
  const row = await connection.query("SELECT id FROM users where email = ?", [email]);
  const user = row[0];
  const q = "DELETE FROM favourite_shabads WHERE user_id = ? AND shabad_id = ?";
  const rows = await connection.query(q, [user.id, shabadId])

  const result = rows.affectedRows ? shabadId : false
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
    {email, shabadId}, 
    getFavouriteShabadsCallback
  )
}

const addFavouriteShabad = (req, res) => {
  const shabadId = req.body.shabadId;
  const comment = req.body.comment;
  const bearerToken = req.headers.authorization;
  const token = bearerToken.substr(7);
  const {email} = jwtVerify(token)

  pool.runQuery(
    req, 
    res, 
    {email, shabadId, comment}, 
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
    {email, shabadId}, 
    deleteFavouriteShabadCallback
  )
}

module.exports = function(server) {  
  server.get('/favourite-shabads', getFavouriteShabads);  
  server.post('/favourite-shabads', addFavouriteShabad);  
  server.delete('/favourite-shabads/:shabadId', deleteFavouriteShabad);  
}
