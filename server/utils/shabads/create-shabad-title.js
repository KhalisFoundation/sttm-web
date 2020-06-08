import {
  transliterationMap,
  getUnicodeVerse
} from '../../../src/js/util/api/shabad';

/**
 *
 * @param {object} shabad - The shabad obj
 **/
export const createShabadTitle = (shabad) => {
  if (!shabad) return '';
  const shabadInEnglish = transliterationMap.english(shabad);
  const shabadUnicode = getUnicodeVerse(shabad);
  return `Shabad ${shabadInEnglish}. ${shabadUnicode}`
}