/* eslint-disable no-console */
const Passport = require("passport");

// const authenticationHelper = (req, res, next, options, type, callback) => {
//   Passport.authenticate(type, { ...options }, function(err, user, info) {
//     if (err) {
//       return res.status(400).json({ errors: err });
//     }
//     if (info !== undefined) {
//       return res.status(500).send(info.message);
//     }    
//     else {
//       callback(user);
//       // res.status(403).send("User Not Authorized");
//     }
//   })(req, res, next);
// };

const authenticationSocialHelper = (
  req,
  res,
  next,
  options,
  type,
  callback
) => {
  Passport.authenticate(type, { ...options }, function(err, user) {
    console.log('.....autheticationSocialHelper.....',err, err.message, user)
    if (err) {
      return res.status(400).json({ errors: err });
    }
    console.log('callback', callback, typeof callback)
    callback(user);
  })(req, res, next);
};

module.exports = {authenticationSocialHelper}