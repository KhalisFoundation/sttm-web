const jwtSign = require('../utils/jwt')
const Passport = require("passport");

const getJwt = (req, res) => {
  const token = jwtSign('navdeep.er@gmail.com');
  res.send(token)
};

const googleSignIn = () => {
  Passport.authenticate('google', { scope: ['profile', 'email'] });
}

const googleSignInCallback = () => {
  Passport.authenticate('google', { failureRedirect: '/fail' },
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
}

module.exports = function(server) {
  server.get('/auth/jwt', getJwt);
  server.get('/auth/google', googleSignIn);
  server.get('/auth/google/callback', googleSignInCallback);
}