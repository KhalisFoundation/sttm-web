import { SOURCES } from '@sttm/banidb';

const suffix = suffix => (value = '') =>
  `${value}${value === '' ? '' : ' - '}${suffix}`;

const suffixAppName = suffix('SikhiToTheMax');

const getAng = req => req.query.ang;
const getSource = req => SOURCES[req.query.source || 'G'];

export default {
  '/': {
    title: suffixAppName(),
    createDescription: () => `SikhiToTheMax, online Gurbani Searcher`,
  },
  '/404': {
    title: suffixAppName('Page not found'),
    createDescription: () => `Page not found.`,
  },
  '/terms-of-service': {
    title: suffixAppName('Terms Of Service'),
    createDescription: () => `Terms of Service of SikhiToTheMax.`,
  },
  '/about': {
    title: suffixAppName('About'),
    createDescription: () =>
      `SikhiToTheMax is backed by a non-profit organization named Khalis Foundation.`,
  },
  '/ang': {
    title: req => suffixAppName(`Ang ${getAng(req)} of ${getSource(req)}`),
    createDescription: req =>
      `Read page number ${getAng(req)} of ${getSource(req)} now`,
  },
  '/index': {
    title: suffixAppName('Index'),
    createDescription: () =>
      `Index page of Sri Guru Granth Sahib Jee and other Sikh Granths.`,
  },
  '/help': {
    title: suffixAppName('Help'),
    createDescription: () =>
      `Need help in understanding how to use SikhiTheMax?`,
  },
  '/hukamnama': {
    title: suffixAppName('Hukamanama'),
    createDescription: () =>
      `Read daily Hukamnama from Sri Darbar Sahib, Harmandir Sahib (Golden Temple) Amritsar online now.`,
  },
  '/search': {
    title: suffixAppName('Search Results'),
    createDescription: () =>
      `Search Shabads and Gurbani by Sikh Gurus and Bhagats like Bhagat Kabeer Jee, Sheikh Fareed Jee.`,
  },
  '/shabad': {
    title: suffixAppName('Shabad'),
    createDescription: () => `Read shabad online right now.`,
  },
};
