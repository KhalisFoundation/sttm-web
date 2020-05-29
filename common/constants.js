
const API_URLS_CONSTANTS = require('./api-urls-constants');
const isProduction = process.env.NODE_ENV === 'production';
export const DARK_MODE_COOKIE = 'darkmode';
export const DARK_MODE_CLASS_NAME = 'dark-mode';

export const ONLINE_COLOR = '#01669b';
export const OFFLINE_COLOR = '#333333';

export const BASIC_META_DESCRIPTION = `Search Sri Guru Granth Sahib Jee, Sri Dasam Granth Sahib, Bhai Gurdas Vaar, Bhai Nandlal Vaar, Bhai Gurdas Singh Vaar, Tankhanaama, Zafarnaama, Amrit Kirtan.`;

export const API_URL = isProduction ? API_URLS_CONSTANTS.PRODUCTION : API_URLS_CONSTANTS.DEVELOPMENT;