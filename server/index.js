const express = require('express');
const path = require('path');

const app = express();

// Use client for static files
app.use(express.static(`${__dirname}/../`));

// Direct all calls to index template
app.get('*', (req, res) => res.sendFile(path.resolve(`${__dirname}/../index.html`)));

// Listen
app.listen('8080', () => console.log('Server started'));
