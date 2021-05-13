const Passport = require("passport");

// const authenticationHelper = (
//   req,
//   res,
//   next,
//   callback
// ) => {
//   const JWT_TOKEN = jwtSign('navdeep.er@gmail.com');
// }

const authenticationSocialHelper = (
  req,
  res,
  next,
  options,
  type,
  callback
) => {
  Passport.authenticate(type, { ...options }, function(err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    callback(user);
  })(req, res, next);
};

module.exports = authenticationSocialHelper