const compression = require('compression');
const express = require('express');
const path = require('path');

const app = express();

// Compress files
app.use(compression());

// Use client for static files
app.use(express.static(`${__dirname}/../`));

// Direct all calls to index template
app.get('*', (req, res) => res.sendFile(path.resolve(`${__dirname}/../index.html`)));

// Listen
const port = process.env.NODE_ENV === 'development' ? '8081' : '8080';
app.listen(port, () => console.log('Server started'));
