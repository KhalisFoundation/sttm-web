/* eslint-disable no-console */
import compression from 'compression';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { hostname as _hostname } from 'os';
import createTemplate from './template';
import seo from '../common/seo';
import {
  DARK_MODE_COOKIE,
  DARK_MODE_CLASS_NAME,
  LANGUAGE_COOKIE,
  DEFAULT_LANGUAGE,
} from '../common/constants';
import { getMetadataFromRequest, createMetadataFromResponse } from './utils/';

const hostname = _hostname().substr(0, 3);
let port = process.env.NODE_ENV === 'development' ? '8081' : '8080';
const ON_HEROKU = 'ON_HEROKU' in process.env;

port = ON_HEROKU ? process.env.PORT : port;

const app = express();

app.use(bodyParser.json());

// Compress files
app.use(compression());

// Add cookie parser
app.use(cookieParser());

// Infrastructure display
app.use((req, res, next) => {
  res.setHeader('origin-server', hostname);
  return next();
});

// API endpoint for voice transcription proxy
app.post('/api/transcribe', async (req, res) => {
  try {
    const origin = req.get('Origin') || req.get('Referer');
    const allowedOrigins = [
      'http://localhost:8081',
      'http://localhost:3000',
      'https://www.sikhitothemax.org',
      'https://sikhitothemax.org',
      'https://dev.sikhitothemax.org',
      'https://www.dev.sikhitothemax.org',
    ];

    if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied'
      });
    }

    const { audioData } = req.body;

    if (!audioData) {
      return res.status(400).json({
        status: 'error',
        message: 'Audio data is required'
      });
    }

    const transcriptionUrl = process.env.AUDIO_TRANSCRIPTION_URL;
    const transcriptionKey = process.env.AUDIO_TRANSCRIPTION_KEY;

    if (!transcriptionUrl || !transcriptionKey) {
      return res.status(500).json({
        status: 'error',
        message: 'Transcription service not configured'
      });
    }

    const response = await fetch(transcriptionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audioData,
        apiKey: transcriptionKey,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Transcription proxy error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Use client for static files
app.use(express.static(`${__dirname}/../public`));

// Direct all calls to index template
app.get('*', async (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const language = req.cookies[LANGUAGE_COOKIE] || DEFAULT_LANGUAGE;

  const { path, url } = req;

  const { createTitle, createDescription } =
    seo[seo[path] === undefined ? '/' : path];

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
});

// Listen on port
app.listen(port, () => console.log(`Server started on port:${port}`));
