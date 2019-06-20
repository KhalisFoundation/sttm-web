const { resolve } = require('path');
const fs = require('fs');
const package = require('../package.json');
const manifest = require('../public/assets/js/manifest.json');

const template = fs.readFileSync(
  resolve(__dirname, '..', 'public', 'sw-self-distruct.js'),
  'utf-8'
);

fs.writeFileSync(
  resolve(__dirname, '..', 'public', 'service-worker.js'),
  template
);

/*const template = fs.readFileSync(
  resolve(__dirname, '..', 'public', 'service-worker-template.js'),
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
);*/
