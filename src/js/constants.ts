import { SOURCES, SOURCES_WITH_ANG, TYPES as _TYPES } from '@sttm/banidb';

export { SOURCES, SOURCES_WITH_ANG };

export const SEARCH_TYPES = {
  FIRST_LETTERS: 0,
  FIRST_LETTERS_ANYWHERE: 1,
  GURMUKHI_WORD: 2,
  ENGLISH_WORD: 3,
  ROMANIZED: 4,
  ANG: 5,
};

export const BANI_LENGTH_COLS = {
  short: 'existsSGPC',
  medium: 'existsMedium',
  long: 'existsTaksal',
  extralong: 'existsBuddhaDal',
};

export const SYNC_TYPES = {
  SHABAD: 'shabad',
  CEREMONY: 'ceremony',
  BANI: 'bani',
};

export const TYPES = [..._TYPES, 'Ang'];

export const SHORT_DOMAIN = 'sttm.co';

export const LOCAL_STORAGE_KEY_FOR_GDPR_NOTICE = 'gdpr_notice';
export const LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE = 'searchSource';
export const LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE = 'searchType';
export const LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES =
  'translationLanguages';
export const LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES =
  'transliterationLanguages';
export const LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST = 'larivaarAssist';
export const LOCAL_STORAGE_KEY_FOR_LARIVAAR = 'larivaar';
export const LOCAL_STORAGE_KEY_FOR_UNICODE = 'unicode';
export const LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW = 'splitView';
export const LOCAL_STORAGE_KEY_FOR_FONT_SIZE = 'fontSize';
export const LOCAL_STORAGE_KEY_FOR_FONT_FAMILY = 'fontFamily';
export const LOCAL_STORAGE_KEY_FOR_DARK_MODE = 'darkMode';
export const LOCAL_STORAGE_KEY_FOR_VISRAAMS = 'visraams';
export const LOCAL_STORAGE_KEY_FOR_VISRAAM_SOURCE = 'visraamSource';
export const LOCAL_STORAGE_KEY_FOR_VISRAAMS_STYLE = 'visraamStyle';
export const LOCAL_STORAGE_KEY_FOR_PREVIOUSLY_READ_ANG = 'previouslyReadAng';
export const LOCAL_STORAGE_KEY_FOR_RELEASE = 'release';
export const LOCAL_STORAGE_KEY_FOR_CENTER_ALIGN_VIEW = 'centerAlignView';
export const LOCAL_STORAGE_KEY_FOR_SYNC_CODE = 'previous-sync';

export const PLACEHOLDERS = {
  [SEARCH_TYPES.FIRST_LETTERS]: ['jmTAq'], // first letters
  [SEARCH_TYPES.FIRST_LETTERS_ANYWHERE]: ['mqjbe'], // first letter anywhere
  [SEARCH_TYPES.GURMUKHI_WORD]: ['jo mwgih Twkur Apuny qy'], // gurmukhi
  [SEARCH_TYPES.ENGLISH_WORD]: ['He has extended His power', true], // translation
  [SEARCH_TYPES.ROMANIZED]: ['jo mange thakur apne te soi', true], // romanized
  [SEARCH_TYPES.ANG]: ['123', true], // ang
};

export const TRANSLATION_LANGUAGES = ['punjabi', 'english', 'spanish'];
export const TRANSLITERATION_LANGUAGES = ['english', 'hindi', 'shahmukhi'];

export const DEFAULT_SEARCH_TYPE = SEARCH_TYPES.FIRST_LETTERS;
export const DEFAULT_SEARCH_SOURCE = 'all';
export const DEFAULT_TRANSLATION_LANGUAGES = ['english'];
export const DEFAULT_TRANSLITERATION_LANGUAGES = ['english'];
export const DEFAULT_LARIVAAR = false;
export const DEFAULT_LARIVAAR_ASSIST = false;
export const DEFAULT_UNICODE = false;
export const DEFAULT_SPLIT_VIEW = false;
export const DEFAULT_FONT_SIZE = 2;
export const DEFAULT_FONT_FAMILY = 'gurmukhi_heavy';
export const DEFAULT_PAGE_TITLE = 'SikhiToTheMax';
export const DEFAULT_DARK_MODE = false;
export const DEFAULT_CENTER_ALIGN_GURBANI = false;
export const DEFAULT_VISRAAMS = false;
export const DEFAULT_VISRAAM_SOURCE = 'sttm';
export const DEFAULT_VISRAAM_STYLE = 'colored-words';

export const LARIVAAR_ASSIST_COLOR = '#f39c1d';
export const HIGHLIGHTED_SEARCH_COLOR = 'rgb(1, 102, 155)';
export const NORMAL_SEARCH_COLOR = 'rgba(1, 102, 155, 0.3)';
export const FIRST_HUKAMNAMA_DATE = '2002/01/01';

export const TEXTS = {
  RELATED_SHABADS: 'Related Shabads',
  URIS: {
    HOME: 'Home',
    ABOUT: 'About',
    SHABAD: 'Shabad',
    ANG: 'Ang',
    INDEX: 'Index',
    HELP: 'Help',
    TOS: 'Terms of Service',
    SUNDAR_GUTKA: 'Sundar Gutka',
    SUNDAR_GUTKA_BAANI: 'Baani',
  },
  GDPR_NOTICE: `
    Our service uses cookies to remember your preferences to give a great experience. If you do not agree to SikhiToTheMax's use of cookies, please use your browser's private/incognito mode. Otherwise, by continuing the use of the service, you consent to the use of cookies. Read more <a href="/help#Web-why-does-sikhitothemax-website-use-cookies-and-loc">here</a>.
  `,
  ANDROID: 'Android',
  IOS: 'iOS',
  SEHAJ_PAATH: (ang: string) => `Continue reading Ang ${ang}`,
  SUNDAR_GUTKA_HEADER: `Sundar Gutka Baaniyaan`,
  SUNDAR_GUTKA_APP: `Download Sundar Gutka App for improved experience on`,
  SYNC: `Remote Sync`,
  CONTROLLER: 'Bani Controller',
  CONTROLLER_TITLE: 'Take Control of SikhiToTheMax',
  CONTROLLER_DESC: 'Control SikhiToTheMax on your computer using your mobile device. Sit anywhere in the Darbar Hall with the sangat or Keertani while still being able to control SikhiToTheMax. Bani Controller adds more flexibility and mobility to project Gurbani on to the big screen.',
  CONTROLLER_ERROR: (type: string = 'code/pin') =>
    `We aren't able to connect to the desktop with the entered ${type}. Make sure it's correct or try again later.`,
  SYNC_TITLE: 'Sync your phone to SikhiToTheMax',
  SYNC_DESCRIPTION: `Sangat Sync allows you to view the Shabad and current line displayed, via our Desktop Application, on your mobile device. Just enter the code below displayed on the screen by the desktop application and you will have the ability to choose what you want displayed such as translations, transliterations, larivaar and more.`,
  SYNC_ERROR: `We aren't able to connect to the entered code. Make sure it's correct or try again later.`,
  SYNC_NOTIFICATION: (code: string) =>
    `You're now connected to ${code}. Tap to dismiss.`,
  SYNC_CONNECTED: (code: string) =>
    `Awesome! You're now connected to the device "${code}" and will start receiving shabads soon! The screen will automatically update now as shabads and lines change on the desktop.`,
  SYNC_DISCONNECT: `Are you sure you want to disconnect now? You can re-connect by entering the same code later.`,
  OFFLINE: `It seems you aren't connected to internet`,
  OFFLINE_DESCRIPTION: `Unfortunately we don't support offline mode at present. Please connect to the internet to use our website and search Gurbani.`,
  HELP_SECTION: 'the help section',
  INDEX_SECTION: 'the index page',
  GENERIC_ERROR: `ਵਾਹਿਗੁਰੂ! Something isn't working correctly`,
  GENERIC_ERROR_DESCRIPTION: `This is really unusual. Try <a href="https://www.thewindowsclub.com/clear-cache-cookies-specific-website" target="_blank" rel="noreferrer nofollow">clearing your cache</a>. If you still face the issue, you may want to hit the Feedback button at the bottom of this page, and report this issue to our team to fix it.`,
  TIMEOUT_ERROR: `ਵਾਹਿਗੁਰੂ! Network connection timed out`,
  TIMEOUT_ERROR_DESCRIPTION: `This usually happens when your internet connection is either down or very slow. Try connecting sometime later?`,
  GO_TO_SHABAD: 'Open Shabad',
  HUKAMNAMA: 'Daily Hukamnama from Sri Harmandir Sahib, Amritsar',
  ANG_NOT_FOUND: `Sorry, we couldn't find the requested ang (page).`,
  ANG_NOT_FOUND_DESCRIPTION: (ang: string, source: string) =>
    `Ang (page) "${ang}" was not found in "${source}". Make sure ang (page) ${ang} is actually present in the selected source. If you still cannot find your shabad, head over to `,
  NO_RESULTS_FOUND: `Sorry, we couldn't find results for your query`,
  NO_RESULTS_FOUND_DESCRIPTION: (source: string, type: string) =>
    `Are you sure you want to search in "${source}" with search type of "${type}"? If not, try changing your search settings from above. If you still cannot find your shabad, head over to `,
  GURBAANI_COPIED: 'Gurbani has been copied to your clipboard!',
  EMBED_COPIED:
    'Embedding code has been copied. Paste it in a rich editor usually found in forums',
  EMBED_FAILURE: "Sorry, we couldn't copy embed code",
  LINK_COPIED: 'Link has been copied to your clipboard!',
  COPY_FAILURE: "Sorry, we couldn't copy the link. Try copying it manually.",
  OPEN_PAGE: 'Open Page',
  PREVIOUS_PAGE: 'Previous Page',
  NEXT_PAGE: 'Next Page',
  PAGE_NOT_FOUND_MESSAGE: 'These are not the Singhs you are looking for.',
  URL_NOT_FOUND: (url: string) =>
    `The requested URL "${url}" was not found on this server.`,
  EMPTY_QUERY: `Oh no! You can't just search for nothing.`,
  EMPTY_QUERY_DESCRIPTION:
    'Please enter your query in the search bar above to give us a chance to serve you.',
  REDIRECTING: 'Redirecting you to',
  REDIRECTING_DESCRIPTION: 'If your browser does not redirect, you may visit',
  RESET: 'Reset',
  SPLIT_VIEW: 'Split View',
  UNICODE: 'Unicode',
  ASSIST: 'Assist',
  FONT: 'Font',
  DISPLAY: 'Display',
  LARIVAAR: 'Larivaar',
  TRANSLATION: 'Translation',
  TRANSLITERATION: 'Transliteration',
  FONT_SIZE: 'Font Size',
  DARK_MODE: 'Dark Mode',
  VISRAAMS: 'Visraams',
  CENTERALIGN: 'Center-Align',
  HUKAMNAMA_NOT_FOUND_DESCRIPTION:
    "We couldn't find the hukamnama for this date in our database.",
};

export const FONT_OPTIONS = {
  anmol_lipi: 'Anmol Lipi',
  anmol_bold: 'Anmol Lipi Bold',
  notosans: 'Noto Sans',
  notosans_bold: 'Noto Sans Bold',
  gurmukhi_normal: 'Gurbani Akhar',
  gurmukhi_heavy: 'Gurbani Akhar Heavy',
  gurmukhi_thick: 'Gurbani Akhar Thick',
  prabhki: 'Prabhki',
  unicode_font: 'Unicode',
};

export const SHABAD_CONTENT_CLASSNAME = 'shabad-content';

export const VISRAAM_CONSTANTS = {
  CLASS_NAME: 'display-visraams',
  SOURCES: {
    sttm: 'Default',
    igurbani: 'iGurbani',
    sttm2: 'STTM (Legacy)',
  },
  TYPES: {
    'colored-words': 'Colored Words',
    'gradient-bg': 'Gradient Background',
  },
  SOURCE_CLASS: (source: string) => `vishraam-vishraam-source-${source}`,
  TYPE_CLASS: (type: string) => `vishraam-vishraam-options-${type}`
}
