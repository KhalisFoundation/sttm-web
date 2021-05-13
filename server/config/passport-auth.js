require("dotenv").config();
const Passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(undefined, profile, undefined);
  }
);

Passport.use("googleAuth", googleStrategy);

module.exports = Passport;
