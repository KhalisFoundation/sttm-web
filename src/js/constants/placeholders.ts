import { SEARCH_TYPES } from "./search-types";

export const PLACEHOLDERS = {
  [SEARCH_TYPES.FIRST_LETTERS]: ['jmTAq'], // first letters
  [SEARCH_TYPES.FIRST_LETTERS_ANYWHERE]: ['mqjbe'], // first letter anywhere
  [SEARCH_TYPES.GURMUKHI_WORD]: ['jo mwgih Twkur Apuny qy'], // gurmukhi
  [SEARCH_TYPES.ENGLISH_WORD]: ['He has extended His power', true], // translation
  [SEARCH_TYPES.ROMANIZED]: ['jo mange thakur apne te soi', true], // romanized
  [SEARCH_TYPES.ANG]: ['123', true], // ang
  [SEARCH_TYPES.MAIN_LETTERS]: ['j mgh Tkr Apn q'], // main letters
  [SEARCH_TYPES.ROMANIZED_FIRST_LETTERS_ANYWHERE]: ['jmtatssd', true] //romanized first letter anywhere
};
