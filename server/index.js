/* eslint-disable no-console */
import compression from 'compression';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
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
const allowedOrigins = process.env.NODE_ENV === 'development' ? [
  'http://localhost:8081',
  'http://localhost:3000',
  'https://www.sikhitothemax.org',
  'https://sikhitothemax.org',
  'https://dev.sikhitothemax.org',
  'https://www.dev.sikhitothemax.org',
] : [
  'https://www.sikhitothemax.org',
  'https://sikhitothemax.org',
];
const ON_HEROKU = 'ON_HEROKU' in process.env;

port = ON_HEROKU ? process.env.PORT : port;

const app = express();

// Parse JSON with increased limit for audio data
app.use(express.json({ limit: '25mb' }));

// Compress files
app.use(compression());

// Add cookie parser
app.use(cookieParser());

// Infrastructure display
app.use((req, res, next) => {
  res.setHeader('origin-server', hostname);
  return next();
});

app.post('/api/feedback', async (req, res) => {
  try {
    const origin = req.get('Origin') || req.get('Referer');

    if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied'
      });
    }
    const { email, shabadId, rating, overallFeedback, verses } = req.body;
    if (!shabadId || !rating) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields'
      });
    }

    const response = await fetch(`${process.env.SODH_API}/api/sttm-shabad-feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, shabadId, starRatings: rating, feedbackText: overallFeedback, verses }),
    });
    const data = await response.json();
    res.json(data);


  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

app.post('/api/feedback/:shabadId', async (req, res) => {
  try {
    const { shabadId } = req.params;
    const { email } = req.body;
    const response = await fetch(`${process.env.SODH_API}/api/sttm-shabad-feedback/${shabadId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Feedback error:', error);
  }
});

app.post('/api/ai-translations', async (req, res) => {
  try {
    const origin = req.get('Origin') || req.get('Referer');

    if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied'
      });
    }

    const { verse_id } = req.body;
    if (!verse_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Verse ids list is required'
      });
    }
    const response = await fetch(process.env.AI_TRANSLATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ verse_ids: verse_id }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('AI translation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// API endpoint for voice transcription proxy
app.post('/api/transcribe', async (req, res) => {
  try {
    const origin = req.get('Origin') || req.get('Referer');

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

    // Check audioData size limit (10MB)
    const MAX_AUDIO_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    const audioDataSize = Buffer.byteLength(audioData, 'utf8');

    if (audioDataSize > MAX_AUDIO_SIZE) {
      return res.status(400).json({
        status: 'error',
        message: `Audio data exceeds maximum size of 10MB. Received: ${(audioDataSize / (1024 * 1024)).toFixed(2)}MB`
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
