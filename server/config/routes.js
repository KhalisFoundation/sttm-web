const jwtSign = require('../utils/jwt')
const authenticationSocialHelper = require('../utils/auth')

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

const ssoCallback = (req, res, next) => {
  authenticationSocialHelper(
    req,
    res,
    next,
    { failureRedirect: '/', failureFlash: true },
    "saml",
    user => {
      return res.send(user)
    }
  );
}

const getJwt = (req, res) => {
  const email = req.query.email
  if (email) {
    const token = jwtSign(email);
    return res.send(token)
  }
  res.status(401).send({message: 'Email is empty'})
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

module.exports = function(server) {
  server.get('/login/sso', sso);
  server.post('/login/sso/callback', ssoCallback);
  server.post('/auth/jwt', getJwt);
  server.get('/auth/google', googleSignIn);
  server.get('/auth/google/callback', googleSignInCallback);
}