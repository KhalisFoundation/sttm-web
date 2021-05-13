const jwtSign = require('../utils/jwt')
const authenticationSocialHelper = require('../utils/auth')

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
      console.log(user)
      return res.send(user)
    }
  );
}

module.exports = function(server) {
  server.post('/auth/jwt', getJwt);
  server.get('/auth/google', googleSignIn);
  server.get('/auth/google/callback', googleSignInCallback);
}