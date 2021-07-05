require("dotenv").config();
const Passport = require("passport");
const passportSaml = require('passport-saml');

Passport.serializeUser((user, done) => {
  done(null, user);
});

Passport.deserializeUser((user, done) => {
  done(null, user);
});

Passport.logoutSaml = function(req, res) {
    //Here add the nameID and nameIDFormat to the user if you stored it someplace.
    req.user.nameID = req.user.saml.nameID;
    req.user.nameIDFormat = req.user.saml.nameIDFormat;

    samlStrategy.logout(req, function(err, request){
        if(!err){
            //redirect to the IdP Logout URL
            res.redirect(request);
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
    logoutUrl: process.enc.SSO_LOGOUT_ENTRYPOINT,
    cert: process.env.SSO_CERT,
  },
  (profile, done) => {    
    return done(null, profile)
  },
);

Passport.use("saml", samlStrategy);

module.exports = Passport;
