"use strict";

let express = require("express"),
    pool = require('../config/database'),
    { jwtVerify } = require("../utils/jwt");

const userCallback = async (connection) => {
  const rows = await connection.query("SELECT * from users");
  console.log(rows)
}    

const favouriteShabad = async (req, res) => {
  const shabadId = req.params.shabadId;
  const bearerToken = req.headers.authorization;
  const token = bearerToken.substr(7);
  const {email} = jwtVerify(token)
  
  pool.getQuery(userCallback)

  // @TODO Sent request to mariadb table to add entry of user_id & shabad_id
  const response = false;
  res.status(200).json({favourite: response, shabadId, email});
}


// const addFavouriteShabad = (req, res) => {
//   //const {id} = req.params;
//   const {token} = req.body;
//   const isVerfied = jwtVerify(token)
//   if(isVerfied) {
//     // @TODO Sent request to mariadb table to add entry of user_id & shabad_id
//     return res.send()
//   }
// }

module.exports = function(server) {  
  server.get('/favourite-shabad/:shabadId', favouriteShabad);  
}