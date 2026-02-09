const { resolve } = require('path');
const fs = require('fs');
const package = require('../package.json');
const manifest = require('../public/assets/js/manifest.json');

// Change source to service-worker-template.js for activating the original service worker
const source = 'sw-self-destroy.js';

const template = fs.readFileSync(
  resolve(__dirname, '..', 'public', source),
  'utf-8'
);

fs.writeFileSync(
  resolve(__dirname, '..', 'public', 'service-worker.js'),
  template
    .replace(/%VERSION/gi, `${package.version}-${Date.now()}`)
    .replace(
      /%JS_ASSETS/gi,
      [manifest['app.js'], manifest['vendor.js']].map(s => `"${s}"`).join(',')
    )
    .replace(
      /%CSS_ASSETS/gi,
      `'/assets/css/vendor/foundation.min.css?v=6.2.4', '/assets/css/bundle.css'`
    )
);
