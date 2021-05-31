require("dotenv").config();
const Passport = require("passport");
const passportSaml = require('passport-saml');

Passport.serializeUser((user, done) => {
  done(null, user);
});

Passport.deserializeUser((user, done) => {
  done(null, user);
});

// SAML strategy for passport -- Single IPD
const samlStrategy = new passportSaml.Strategy(
  {
    entryPoint: process.env.SSO_ENTRYPOINT,
    issuer: process.env.SSO_ISSUER,
    callbackUrl: process.env.SSO_CALLBACK_URL,
    cert: process.env.SSO_CERT,
  },
  (profile, done) => {    
    return done(null, profile)
  },
);

Passport.use("saml", samlStrategy);

module.exports = Passport;
