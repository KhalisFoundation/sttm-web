/* eslint-disable no-console */
require("dotenv").config();
const Passport = require("passport");
const passportSaml = require('passport-saml');

Passport.serializeUser((user, done) => {
  done(null, user);
});

Passport.deserializeUser((user, done) => {
  done(null, user);
});

Passport.logoutSaml = (req, res) => {
    console.log(req.user)
    samlStrategy.logout(req, function(err, request){
      // eslint-disable-next-line no-console
      console.log(err, request)
        if(!err){
            //redirect to the IdP Logout URL
            res.redirect(request);
            return;
        }
    });

    res.status(401).json({message: 'Something wrong happens while logout'})
};

// SAML strategy for passport -- Single IPD
const samlStrategy = new passportSaml.Strategy(
  {
    entryPoint: process.env.SSO_ENTRYPOINT,
    issuer: process.env.SSO_ISSUER,
    callbackUrl: process.env.SSO_CALLBACK_URL,
    logoutUrl: process.env.SSO_LOGOUT_ENTRYPOINT,
    cert: process.env.SSO_CERT,
  },
  (profile, done) => {    
    return done(null, profile)
  },
);

Passport.use("saml", samlStrategy);

module.exports = Passport;
