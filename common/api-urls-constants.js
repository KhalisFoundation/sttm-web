const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  BANIS: isProduction
    ? '//banidb.khalis.dev/v2/banis'
    : '//api.khajana.org/v2/banis',
  PRODUCTION: '//banidb.khalis.dev/v2/',
  DEVELOPMENT: '//api.khajana.org/v2/',
  AMRIT_KEERTAN: '//banidb.khalis.dev/v2/amritkeertan',
  AMRIT_KEERTAN_SHABADS: '//banidb.khalis.dev/v2/shabads',
  BANNERS: '//api.sikhitothemax.org/messages/web',
  SYNC: {
    PRODUCTION: '//api.sikhitothemax.org/',
    LOCAL: '//stgapi.sikhitothemax.org/',
  },
  CEREMONIES: '//api.sikhitothemax.org/ceremonies/',
  DOODLE: '//api.sikhitothemax.org/doodle/',
  WRITERS: '//banidb.khalis.dev/v2/writers/',
  GURBANIBOT: '//gurbanichatbot.sikhitothemax.org/',
};
