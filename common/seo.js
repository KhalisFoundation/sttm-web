import { SOURCES } from '@sttm/banidb';

const suffix = suffix => (value = '') =>
  `${value}${value === '' ? '' : ' - '}${suffix}`;

const suffixAppName = suffix('SikhiToTheMax');

const getAng = req => req.query.ang;
const getSource = req => SOURCES[req.query.source || 'G'];
const basicDescription = `Search Sri Guru Granth Sahib Jee, Sri Dasam Granth Sahib, Bhai Gurdas Vaar, Bhai Nandlal Vaar, Bhai Gurdas Singh Vaar, Tankhanaama, Zafarnaama, Amrit Kirtan.`;

export default {
  '/': {
    title: suffixAppName(),
    createDescription: () =>
      `SikhiToTheMax, online Gurbani Searcher. ${basicDescription}`,
  },
  '/404': {
    title: suffixAppName('Page not found'),
    createDescription: () => `Page not found. ${basicDescription}`,
  },
  '/terms-of-service': {
    title: suffixAppName('Terms Of Service'),
    createDescription: () =>
      `Terms of Service of SikhiToTheMax. ${basicDescription}`,
  },
  '/about': {
    title: suffixAppName('About'),
    createDescription: () =>
      `SikhiToTheMax is backed by a non-profit organization named Khalis Foundation. ${basicDescription}`,
  },
  '/ang': {
    title: req => suffixAppName(`Ang ${getAng(req)} of ${getSource(req)}`),
    createDescription: req =>
      `Read page number ${getAng(req)} of ${getSource(
        req
      )} now. ${basicDescription}`,
  },
  '/index': {
    title: suffixAppName('Index'),
    createDescription: () =>
      `Index page of Sri Guru Granth Sahib Jee, Sri Dasam Granth. Read Asa Ki Vaar, Raag Dhanasari, Ramkali Ki Vaar Rai Balvand, Shalok Sehskritee, Shalok Vaaran Te Vadeek, Salok Mahalla 9, Raag Maala, Akaal Ustat, Vaar Sri Bhagouti Jee kee, Sri Shastar Naam Mala, Zafarnamah, Khalsa Mahima, Sri Charitropakhyan`,
  },
  '/help': {
    title: suffixAppName('Help'),
    createDescription: () =>
      `Need help in understanding how to use SikhiTheMax? ${basicDescription}`,
  },
  '/hukamnama': {
    title: suffixAppName('Hukamanama'),
    createDescription: () =>
      `Read Sri Mukhwaakh Hukamnama of today from Sri Darbar Sahib, Harmandir Sahib (Golden Temple) Amritsar online now. ${basicDescription}`,
  },
  '/search': {
    title: suffixAppName('Search Results'),
    createDescription: () =>
      `Search Sri Guru Granth Sahib Jee, Sri Dasam Granth Sahib, Bhai Gurdas Vaaran and Gurbani by Sikh Gurus; Guru Nanak Dev, Guru Angad Dev, Guru Amardas, Guru Ramdass, Guru Arjan Dev, Guru Tegh Bahadur, Guru Gobind Singh and Bhagats like Bhagat Kabir Jee, Sheikh Fareed Jee, Bhagat Jaidev, Bhagat Naamdev, Bhagat Ravidaas, Bhagat Ramanand, Bhagat Parmanand, Bhagat Trilochan, Bhagat Surdas.`,
  },
  '/shabad': {
    title: suffixAppName('Shabad'),
    createDescription: () =>
      `Read shabad online right now. ${basicDescription}`,
  },
  '/sync': {
    title: suffixAppName('Sync'),
    createDescription: () => ``,
  },
  '/sundar-gutka': {
    title: suffixAppName('Sundar Gutka'),
    createDescription: () =>
      `Read Nitnem Baanies like Japji Sahib, Jaap Sahib, Tva Prasad Sawaiye, Benit Chaupayee Sahib, Anand Sahib, Rehiraas Sahib, Aartee, Ardaas, Kirtan Sohilla Sahib with translations, transliterations and larivaar options online right now from Sundar Gutka.`,
  },
};
