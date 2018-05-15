const VERSION = 'v0';

const onCache = cache =>
  cache.addAll([
    '/',
    '/assets/js/chunks/vendor.js',
    '/assets/js/app.js',
    '/assets/css/vendor/foundation.min.css?v=6.2.4',
    '/assets/css/bundle.css',
    '/favicon.ico',
  ]);

this.addEventListener('install', e =>
  e.waitUntil(caches.open(VERSION).then(onCache))
);

this.addEventListener('activate', e =>
  e.waitUntil(
    caches
      .keys()
      .then(cs => cs.filter(c => c !== VERSION))
      .then(cs => Promise.all(cs.map(c => caches.delete(c))))
      .then(() => self.clients.claim())
  )
);

this.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)))
);
