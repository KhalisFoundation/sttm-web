const compression = require('compression');
const express = require('express');
const os = require('os');
const path = require('path');

const app = express();
const hostname = os.hostname().substr(0, 3);
const port = process.env.NODE_ENV === 'development' ? '8081' : '8080';

// Compress files
app
  .use(compression())

  // Infrastructure display
  .use((req, res, next) => {
    res.setHeader('origin-server', hostname);
    return next();
  })

  // Use client for static files
  .use(express.static(`${__dirname}/../`))

  // Direct all calls to index template
  .get('*', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../index.html`));
  })

  // Listen
  // eslint-disable-next-line no-console
  .listen(port, () => console.log(`Server started on port:${port}`));

module.exports = app;
