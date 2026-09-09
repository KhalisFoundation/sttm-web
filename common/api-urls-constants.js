const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  BANIS: isProduction
    ? '//api.banidb.com/v2/banis'
    : '//api.khajana.org/v2/banis',
  PRODUCTION: '//api.banidb.com/v2/',
  DEVELOPMENT: '//api.khajana.org/v2/',
  AMRIT_KEERTAN: '//api.banidb.com/v2/amritkeertan',
  AMRIT_KEERTAN_SHABADS: '//api.banidb.com/v2/shabads',
  BANNERS: '//api.sikhitothemax.org/messages/web',
  SYNC: {
    PRODUCTION: '//api.sikhitothemax.org/',
    LOCAL: '//stgapi.sikhitothemax.org/',
  },
  CEREMONIES: '//api.sikhitothemax.org/ceremonies/',
  DOODLE: '//api.sikhitothemax.org/doodle/',
  WRITERS: '//api.banidb.com/v2/writers/',
  SP_API: '//serviceprovider.khalis.net',
  SHABAD_REVIEW_API: '//sodh-api.banidb.com/',
  // New Khalis AI backend. Used server-side by the same-origin proxy
  // (server/khalis-ai-proxy.js) as both the target and the forwarded Origin
  // (the backend enforces Origin === its own WEB_ORIGIN). Absolute URL because
  // the Node server fetches it. Override with KHALIS_AI_API / KHALIS_AI_ORIGIN.
  KHALIS_AI: isProduction
    ? 'https://khalis-ai.salmonriver-80392db4.eastus.azurecontainerapps.io'
    : 'http://127.0.0.1:4310',
};
