const VERSION = '%VERSION';

const onCache = cache =>
  cache.addAll([
    '/',
    '/assets/js/chunks/vendor.js',
    '/assets/js/app.js',
    '/assets/css/vendor/foundation.min.css?v=6.2.4',
    '/assets/css/bundle.css',
    '/assets/images/Sach Kaur.png',
    '/assets/images/404.png',
    '/assets/images/spinner-mandala.png',
    '/favicon.ico',
  ]);

// On service worker install, cache all assets
this.addEventListener('install', e =>
  e.waitUntil(caches.open(VERSION).then(onCache))
);

// On activate, remove previous cache and claim all clients.
this.addEventListener('activate', e =>
  e.waitUntil(
    caches
      .keys()
      .then(cs => cs.filter(c => c !== VERSION))
      .then(cs => Promise.all(cs.map(c => caches.delete(c))))
      .then(() => self.clients.claim())
  )
);

// On fetch, intercept and serve from cache if present
this.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)))
);
