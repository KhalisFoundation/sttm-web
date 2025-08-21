const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  BANIS: isProduction
    ? '//localhost:3000/v2/banis'
    : '//localhost:3000/v2/banis',
  PRODUCTION: '//localhost:3000/v2/',
  DEVELOPMENT: '//localhost:3000/v2/',
  AMRIT_KEERTAN: '//localhost:3000/v2/amritkeertan',
  AMRIT_KEERTAN_SHABADS: '//localhost:3000/v2/shabads',
  BANNERS: '//api.sikhitothemax.org/messages/web',
  SYNC: {
    PRODUCTION: '//api.sikhitothemax.org/',
    LOCAL: '//stgapi.sikhitothemax.org/',
  },
  CEREMONIES: '//api.sikhitothemax.org/ceremonies/',
  DOODLE: '//api.sikhitothemax.org/doodle/',
  WRITERS: '//localhost:3000/v2/writers/',
  GURBANIBOT: '//gurbanichatbot.sikhitothemax.org/',
  SP_API: '//serviceprovider.khalis.net',
};
