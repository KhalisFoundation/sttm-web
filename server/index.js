import compression from 'compression';
import express from 'express';
import { hostname as _hostname } from 'os';
import createTemplate from './template';
import seo from '../seo';

const app = express();

// Compress files
app.use(compression());

// Infrastructure display
const hostname = _hostname().substr(0, 3);
app.use((req, res, next) => {
  res.setHeader('origin-server', hostname);
  return next();
});

// Use client for static files
app.use(express.static(`${__dirname}/../`));

// Direct all calls to index template
app.get('*', (req, res) => {
  const { path } = req;
  const { title, createDescription } = seo[
    seo[path] === undefined ? '/' : path
  ];
  const description = createDescription(req);
  const template = createTemplate({ title, description });
  template(res);
});

// Listen
const port = process.env.NODE_ENV === 'development' ? '8081' : '8080';
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started on port:${port}`));
