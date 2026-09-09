/* eslint-disable no-console */
// Same-origin reverse proxy to the new Khalis AI backend.
//
// The backend pins `Origin === WEB_ORIGIN`, uses sameSite:strict cookies and
// ships no CORS headers, so the browser can't call it directly. This proxy sits
// on sttm-web's own origin: it forwards the session/csrf/turn requests to the
// backend with the expected Origin, and passes the backend's Set-Cookie back so
// the session cookie lives on this origin. Anonymous (no auth) is fine.
//
// Env:
//   KHALIS_AI_API     backend base URL (default http://127.0.0.1:5173)
//   KHALIS_AI_ORIGIN  the backend's allowed WEB_ORIGIN (default = KHALIS_AI_API)
import { Readable } from 'stream';
import API_URLS from '../common/api-urls-constants';

const backendBase = () =>
  (process.env.KHALIS_AI_API || API_URLS.KHALIS_AI).replace(/\/+$/, '');
const backendOrigin = () =>
  process.env.KHALIS_AI_ORIGIN || process.env.KHALIS_AI_API || API_URLS.KHALIS_AI;

// Only these request headers are forwarded upstream (the session cookie + the
// CSRF/idempotency bits the turn protocol needs). The caller's Origin is NOT
// forwarded — we set the backend's expected Origin instead.
const FORWARD_REQUEST_HEADERS = [
  'cookie',
  'content-type',
  'accept',
  'x-csrf-token',
  'idempotency-key',
  'last-event-id',
];

export function mountKhalisAiProxy(app, allowedOrigins) {
  app.all('/api/khalis-ai/*', async (req, res) => {
    // Same-origin guard: only our own web app may use this proxy.
    const origin = req.get('Origin') || req.get('Referer');
    if (origin && !allowedOrigins.some((allowed) => origin.startsWith(allowed))) {
      return res.status(403).json({ error: 'forbidden_origin' });
    }

    const subPath = req.params[0] || '';
    const search = req.originalUrl.includes('?')
      ? req.originalUrl.slice(req.originalUrl.indexOf('?'))
      : '';
    const target = `${backendBase()}/api/khalis-ai/v1/${subPath}${search}`;

    const headers = {};
    for (const name of FORWARD_REQUEST_HEADERS) {
      const value = req.get(name);
      if (value) headers[name] = value;
    }
    headers.origin = backendOrigin();

    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
    // express.json() already parsed the body; re-serialize it for the upstream.
    const body = hasBody ? JSON.stringify(req.body || {}) : undefined;

    let upstream;
    try {
      upstream = await fetch(target, {
        method: req.method,
        headers,
        body,
        redirect: 'manual',
      });
    } catch (err) {
      console.error('khalis-ai proxy error:', err.message);
      return res.status(502).json({ error: 'khalis_ai_unreachable' });
    }

    const contentType = upstream.headers.get('content-type');
    if (contentType) res.setHeader('Content-Type', contentType);
    const isEventStream =
      !!contentType && contentType.indexOf('text/event-stream') !== -1;
    const cacheControl = upstream.headers.get('cache-control');
    if (isEventStream) {
      // Stream SSE live: `no-transform` tells the compression middleware to pass
      // the response straight through instead of buffering it, so the turn's
      // progress events reach the browser as they happen (not all at once at the
      // end). `X-Accel-Buffering: no` does the same for an nginx front.
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('X-Accel-Buffering', 'no');
    } else if (cacheControl) {
      res.setHeader('Cache-Control', cacheControl);
    }
    // Pass the backend session cookie(s) through so they persist on this origin.
    const setCookies =
      typeof upstream.headers.getSetCookie === 'function'
        ? upstream.headers.getSetCookie()
        : [];
    if (setCookies.length) res.setHeader('Set-Cookie', setCookies);

    res.status(upstream.status);
    if (isEventStream && typeof res.flushHeaders === 'function') res.flushHeaders();

    if (upstream.body) {
      Readable.fromWeb(upstream.body).pipe(res);
    } else {
      res.end();
    }
  });
}
