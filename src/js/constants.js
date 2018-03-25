export const SHORT_DOMAIN = 'sttm.co';

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

export const PLACEHOLDERS = {
  0: ['jmTAq'], // first letters
  1: ['mqjbe'], // first letter anywhere
  2: ['jo mwgih Twkur Apuny qy'], // gurmukhi
  3: ['He has extended His power', true], // translation
  4: ['jo mange thakur apne te soi', true], // romanized
  5: ['123', true], //ang
};

export const TRANSLATION_LANGUAGES = ['punjabi', 'english', 'spanish'];
export const TRANSLITERATION_LANGUAGES = ['english'];

export const DEFAULT_SEARCH_TYPE = 0;
export const DEFAULT_SEARCH_SOURCE = 'all';
export const DEFAULT_TRANSLATION_LANGUAGES = ['english'];
export const DEFAULT_TRANSLITERATION_LANGUAGES = ['english'];
export const DEFAULT_LARIVAAR = false;
export const DEFAULT_LARIVAAR_ASSIST = false;
export const DEFAULT_UNICODE = false;
export const DEFAULT_SPLIT_VIEW = false;
export const DEFAULT_FONT_SIZE = 2;
export const DEFAULT_PAGE_TITLE = 'SikhiToTheMax';

export const LARIVAAR_ASSIST_COLOR = '#f39c1d';

export const TEXTS = {
  GENERIC_ERROR: `ਵਾਹਿਗੁਰੂ! Something isn't working correctly`,
  GENERIC_ERROR_DESCRIPTION: `This is really unsual. You may want to hit the Feedback button at the bottom of this page, and report this issue to our Sevadaars to fix it before others face it.`,
  GO_TO_SHABAD: 'Open Shabad',
  HUKAMNAMA: 'Daily Hukamnama from Sri Harmandir Sahib, Amritsar',
  NO_RESULTS_FOUND: query =>
    `Sorry, we couldn't find results for your query "${query}".`,
  NO_RESULTS_FOUND_DESCRIPTION: (source, type) =>
    `Are you sure you want to search in "${source}" with search type of "${type}"? If not, try changing your search settings from above. If you still can not find your shabad, head over to `,
  GURBAANI_COPIED: 'Gurbaani has been copied to your clipboard!',
  LINK_COPIED: 'Link has been copied to your clipboard!',
  COPY_FAILURE: "Sorry, we couldn't copy the link. Try copying it manually.",
  PREVIOUS_PAGE: 'Previous Page',
  NEXT_PAGE: 'Next Page',
  PAGE_NOT_FOUND_MESSAGE: 'These are not the Singhs you are looking for.',
  URL_NOT_FOUND: url =>
    `The requested URL "${url}" was not found on this server.`,
  EMPTY_QUERY: `Oh no! You can't just search for nothing.`,
  EMPTY_QUERY_DESCRIPTION:
    'Please enter your query in the search bar above to give us a chance to serve you.',
};
