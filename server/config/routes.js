/* eslint-disable no-console */
const {jwtSign, jwtVerify} = require('../utils/jwt')
const {authenticationSocialHelper} = require('../utils/auth')

/**
 * This Route Authenticates req with IDP
 * If Session is active it returns saml response
 * If Session is not active it redirects to IDP's login form
 */
export const sso = (req, res, next) => {
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

export const ssoDemo = (req, res) => {
  const email = req.query.email
  const token = jwtSign({email});  
  res.redirect('/?token=' + token)
}

export const ssoCallback = (req, res, next) => {
  authenticationSocialHelper(
    req,
    res,
    next,
    { failureRedirect: '/', failureFlash: true },
    "saml",
    user => {
      console.log(req);
      console.log(user);
      const {email} = user;
      const token = jwtSign({email});
      res.redirect('/?token=' + token)
    }
  );
}

export const ssoLogout = (req, res) => {
  req.logout();
  res.redirect('/?logout=success');
}

export const authJwt = (req, res) => {
  const {token} = req.body;
  const isVerfied = jwtVerify(token)
  return res.status(200).json(isVerfied)
};

const googleSignIn = (req, res, next) => {
  authenticationSocialHelper(
    req,
    res,
    next,
    { scope: ["profile", "email"] },
    "googleAuth"
  );
}

const googleSignInCallback = (req, res, next) => {
  authenticationSocialHelper(
    req,
    res,
    next,
    {},
    "googleAuth",
    user => {
      return res.send(user)
    }
  );
}

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
  server.post('/login/saml', ssoCallback);
  server.get('/login/demo', ssoDemo);
  server.post('/auth/jwt', authJwt);
  server.get('/auth/google', googleSignIn);
  server.get('/auth/google/callback', googleSignInCallback);
}