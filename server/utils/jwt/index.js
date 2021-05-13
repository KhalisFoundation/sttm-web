const Jwt = require("jsonwebtoken");

const jwtSign = email => {
  const JWT_TOKEN = Jwt.sign({ email: email }, process.env.JWT_SECRET);
  return JWT_TOKEN;
};

module.exports = jwtSign;