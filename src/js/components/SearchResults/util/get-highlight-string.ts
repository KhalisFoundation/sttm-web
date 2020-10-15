import { SEARCH_TYPES } from '@/constants';
import { translationMap, transliterationMap } from '@/util';

export const getHighlightString = (type: keyof typeof SEARCH_TYPES, shabad: any) => {
  const isSearchTypeEnglishWord = type === SEARCH_TYPES.ENGLISH_WORD;
  const isSearchTypeRomanizedFirstLetters = type === SEARCH_TYPES.ROMANIZED_FIRST_LETTERS_ANYWHERE;
  const shabadEnglishTranslation = translationMap['english'](shabad)
  const shabadEnglishTransliteration = transliterationMap['english'](shabad);

  if (isSearchTypeEnglishWord) {
    return shabadEnglishTranslation;
  }

  if (isSearchTypeRomanizedFirstLetters) {
    return shabadEnglishTransliteration;
  }

  return shabad.verse.gurmukhi;

}