/* eslint-disable no-console */
import compression from 'compression';
require("dotenv").config();
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { hostname as _hostname } from 'os';
import createTemplate from './template';
import seo from '../common/seo';
import { DARK_MODE_COOKIE, DARK_MODE_CLASS_NAME, LANGUAGE_COOKIE, DEFAULT_LANGUAGE } from '../common/constants';
import { getMetadataFromRequest, createMetadataFromResponse } from './utils/';

const passport = require("./config/passport-auth");

// Setup Mariadb
// const mariadb = require('mariadb');
// const pool = mariadb.createPool({host: 'mariadb', port: 3306, user: 'root', password: 'root', database: 'tp3'});

const hostname = _hostname().substr(0, 3);
let port = process.env.NODE_ENV === 'development' ? '8081' : '8080';
const ON_HEROKU = 'ON_HEROKU' in process.env;

port = ON_HEROKU ? process.env.PORT : port;

const app = express();

app.use(bodyParser.json())

// Compress files
app.use(compression())

  // Add cookie parser
app.use(cookieParser())

  // Infrastructure display
app.use((req, res, next) => {
    res.setHeader('origin-server', hostname);
    return next();
  })

  // passport middleware
app.use(passport.initialize())

  // Use client for static files
app.use(express.static(`${__dirname}/../public`))

// Define routes here
require("./config/routes")(app);
  // sso routes  
  // .get('/login/sso', sso)
  // .post('/login/saml', 
  //   bodyParser.urlencoded({ extended: false }),
  //   passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
  //   function (req, res) {
  //     const {nameID, email, nameIDFormat} = req.user;
  //     const token = jwtSign({nameID, email, nameIDFormat});
  //     res.redirect('/?token=' + token)
  //   }
  // )
  // .get('/logout', (req, res) => {   
  //   const {nameID, nameIDFormat} = req.params
  //   req.user = { nameID, nameIDFormat }
  //   passport.logoutSaml(req, res)
  // })
  // .get('/logout/saml', ssoLogout)
  // .post('/auth/jwt', authJwt)
  //.post('/favourite-shabads/:id', addFavouriteShabad)

  // MariaDB routes
  // .get('/mariadb', (req, res) => {
  //   pool.getConnection()
  //     .then(conn => {
  //       console.log(conn)
  //       res.status(200).json({message: 'MariaDB Connection Successful'})
  //     }).catch(err => {
  //       console.log(err);
  //       res.json({error: err, success: false});
  //   });
  // })

  // Direct all calls to index template
app.get('*', async (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    const language = req.cookies[LANGUAGE_COOKIE] || DEFAULT_LANGUAGE;

    const { path, url } = req;

    const { createTitle, createDescription } = seo[
      seo[path] === undefined ? '/' : path
    ];

    // get the title/description from API call if needed.
    const bodyClass =
      DARK_MODE_COOKIE in req.cookies &&
        parseInt(req.cookies[DARK_MODE_COOKIE], 10) === 1
        ? DARK_MODE_CLASS_NAME
        : '';

    let metaData;
    try {
      const data = await getMetadataFromRequest(req);
      metaData = createMetadataFromResponse(req, data);

    } catch (err) {
      console.error('err.message', err.message);
    } finally {
      const title = createTitle(metaData && metaData.title);
      const description = createDescription(metaData && metaData.description);

      const template = createTemplate({
        url,
        bodyClass,
        title,
        description,
        language,
      });

      template(res, { debug: 'off', stringToBufferThreshold: 1000 });
    }
  })


  // Listen on port
app.listen(port, () => console.log(`Server started on port:${port}`));