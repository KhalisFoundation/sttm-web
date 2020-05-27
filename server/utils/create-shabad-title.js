import { transliterationMap, getUnicodeVerse } from '../../src/js/util/api/shabad';

/**
 *
 * @param {object} shabad - The shabad obj
 **/
export const createShabadTitle = (shabad) => {
  if (!shabad) return '';
  return `${transliterationMap(shabad).english}. ${getUnicodeVerse(shabad)}`
}