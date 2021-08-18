import { suffixAppName } from '../server/utils/';
import { BASIC_META_DESCRIPTION } from './constants';

export default {
  '/': {
    createTitle: () => suffixAppName(),
    createDescription: () => `SikhiToTheMax, online Gurbani Searcher. ${BASIC_META_DESCRIPTION}`,
  },
  '/404': {
    createTitle: () => suffixAppName('Page not found'),
    createDescription: () => 'Page not found.'
  },
  '/terms-of-service': {
    createTitle: () => suffixAppName('Terms Of Service'),
    createDescription: () => 'Terms of Service of SikhiToTheMax.'
  },
  '/about': {
    createTitle: () => suffixAppName('About'),
    createDescription: () => 'SikhiToTheMax is backed by a non-profit organization named Khalis Foundation.'
  },
  '/ang': {
    createTitle: (title = 'Ang') => suffixAppName(title),
    createDescription: (description = 'Read page number ') => description,
  },
  '/index': {
    createTitle: () => suffixAppName('Index'),
    createDescription: () => 'Index page of Sri Guru Granth Sahib Jee, Sri Dasam Granth. Read Asa Ki Vaar, Raag Dhanasari, Ramkali Ki Vaar Rai Balvand, Shalok Sehskritee, Shalok Vaaran Te Vadeek, Salok Mahalla 9, Raag Maala, Akaal Ustat, Vaar Sri Bhagouti Jee kee, Sri Shastar Naam Mala, Zafarnamah, Khalsa Mahima, Sri Charitropakhyan',
  },
  '/index/sri-guru-granth-sahib': {
    createTitle: () => suffixAppName('Index Sri Guru Granth Sahib Jee'),
    createDescription: () => 'Index page of Sri Guru Granth Sahib Jee.',
  },
  '/index/sri-dasam-granth-sahib': {
    createTitle: () => suffixAppName('Index Sri Dasam Granth Sahib'),
    createDescription: () => 'Index page of Sri Dasam Granth Sahib.',
  },
  '/index/bhai-nand-lal-vaaran': {
    createTitle: () => suffixAppName('Index Bhai Nand Lal Ji Vaaran'),
    createDescription: () => 'Index page of Bhai Nand Lal Ji Vaaran.',
  },
  '/index/amrit-keertan': {
    createTitle: () => suffixAppName('Index Amrit Keertan'),
    createDescription: () => 'Index page of Amrit Keertan.',
  },
  '/help': {
    createTitle: () => suffixAppName('Help'),
    createDescription: () => 'Needs help in understanding how to use SikhiTheMax?'
  },
  '/hukamnama': {
    createTitle: () => suffixAppName('Hukamanama'),
    createDescription: () => `Read Sri Mukhwaakh Hukamnama of today from Sri Darbar Sahib, Harmandir Sahib (Golden Temple) Amritsar online now. ${BASIC_META_DESCRIPTION}`,
  },
  '/search': {
    createTitle: () => suffixAppName('Search Results'),
    createDescription: () => 'Search Sri Guru Granth Sahib Jee, Sri Dasam Granth Sahib, Bhai Gurdas Vaaran and Gurbani by Sikh Gurus; Guru Nanak Dev, Guru Angad Dev, Guru Amardas, Guru Ramdass, Guru Arjan Dev, Guru Tegh Bahadur, Guru Gobind Singh and Bhagats like Bhagat Kabir Jee, Sheikh Fareed Jee, Bhagat Jaidev, Bhagat Naamdev, Bhagat Ravidaas, Bhagat Ramanand, Bhagat Parmanand, Bhagat Trilochan, Bhagat Surdas.'
  },
  '/shabad': {
    createTitle: (title = 'Shabad') => suffixAppName(title),
    createDescription: (description = 'Read shabad ') => description,
  },
  '/sync': {
    createTitle: () => suffixAppName('Sync'),
    createDescription: () => '',
  },
  '/sundar-gutka': {
    createTitle: () => suffixAppName('Sundar Gutka'),
    createDescription: () => 'Read Nitnem Baanies like Japji Sahib, Jaap Sahib, Tva Prasad Sawaiye, Benit Chaupayee Sahib, Anand Sahib, Rehiraas Sahib, Aartee, Ardaas, Kirtan Sohilla Sahib with translations, transliterations and larivaar options online right now from Sundar Gutka.',
  },
};
