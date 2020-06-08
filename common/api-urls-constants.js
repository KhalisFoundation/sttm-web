const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  BANIS: isProduction ? '//api.banidb.com/v2/banis' : "//api.khajana.org/v2/banis",
  PRODUCTION: '//api.banidb.com/v2/',
  DEVELOPMENT: '//api.khajana.org/v2/',
  BANNERS: '//api.sikhitothemax.org/messages/web',
  SYNC: {
    PRODUCTION: '//api.sikhitothemax.org/',
    LOCAL: '//api.sikhitothemax.org/',
  },
  CEREMONIES: '//api.sikhitothemax.org/ceremonies/',
  DOODLE: '//api.sikhitothemax.org/doodle/'
};