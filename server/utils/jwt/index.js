const Jwt = require("jsonwebtoken");

const jwtSign = options => {
  const JWT_TOKEN = Jwt.sign({ ...options }, process.env.JWT_SECRET, {expiresIn: '7d'});
  return JWT_TOKEN;
};

const jwtVerify = token => {
  const decoded = Jwt.verify(token, process.env.JWT_SECRET);
  return decoded
}

module.exports = {jwtSign, jwtVerify};