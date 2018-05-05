const compression = require('compression');
const express = require('express');
const os = require('os');
const path = require('path');

const app = express();

// Compress files
app.use(compression());

// Infrastructure display
const hostname = os.hostname().substr(0, 3);
app.use((req, res, next) => {
  res.setHeader('origin-server', hostname);
  return next();
});

// Use client for static files
app.use(express.static(`${__dirname}/../`));

// Direct all calls to index template
app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../index.html`));
});

// Listen
const port = process.env.NODE_ENV === 'development' ? '8081' : '8080';
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started on port:${port}`));
