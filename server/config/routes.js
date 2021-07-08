/* eslint-disable no-console */
const passport = require("./passport-auth");
import bodyParser from 'body-parser';
const {jwtSign, jwtVerify} = require('../utils/jwt')
const {authenticationSocialHelper} = require('../utils/auth')

/**
 * This Route Authenticates req with IDP
 * If Session is active it returns saml response
 * If Session is not active it redirects to IDP's login form
 */
const sso = (req, res, next) => {
  authenticationSocialHelper(
    req,
    res,
    next,
    {
      successRedirect: '/',
      failureRedirect: '/login',
    },
    "saml"
  );
}

const ssoCallback = (req, res) => {    
  const {nameID, email, nameIDFormat} = req.user;
  const token = jwtSign({nameID, email, nameIDFormat});
  res.redirect('/?token=' + token);
}

const ssoLogout = (req, res) => {
  const {nameID, nameIDFormat} = req.params
  req.user = { nameID, nameIDFormat }
  passport.logoutSaml(req, res)
}

export const ssoLogoutCallback = (req, res) => {
  req.logout();
  res.redirect('/?logout=success');
}

export const authJwt = (req, res) => {
  const {token} = req.body;
  const isVerfied = jwtVerify(token)
  return res.status(200).json(isVerfied)
};

export const addFavouriteShabad = (req, res) => {
  //const {id} = req.params;
  const {token} = req.body;
  const isVerfied = jwtVerify(token)
  if(isVerfied) {
    // @TODO Sent request to mariadb table to add entry of user_id & shabad_id
    return res.send()
  }
}


module.exports = function(server) {
  server.get('/login/sso', sso);
  server.post('/login/saml', bodyParser.urlencoded({ extended: false }), passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }), ssoCallback);
  server.get('/logout', ssoLogout);
  server.get('/logout/saml', ssoLogoutCallback);
  server.post('/auth/jwt', authJwt);  
}