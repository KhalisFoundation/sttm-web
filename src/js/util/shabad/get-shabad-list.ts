import { buildApiUrl } from '@sttm/banidb';
import { SEARCH_TYPES } from '@/constants';
import { toShabadURL } from '../url';
import {
  translationMap,
  transliterationMap,
  getGurmukhiVerse,
  getVerseId,
  getShabadId,
  getUnicodeVerse,
} from '../api/shabad';
import { getHighlightIndices } from '../gurbani';

export const getShabadList = (q, { type, source, writer, isGurmukhi }) => {
  const offset = 1;
  const isSearchTypeRomanizedFirstLetters =
    type === SEARCH_TYPES.ROMANIZED_FIRST_LETTERS_ANYWHERE;
  const livesearch = !isSearchTypeRomanizedFirstLetters;

  const apiParams = { q, type, source, writer, offset, API_URL, livesearch };
  // Add isGurmukhi parameter if provided
  if (isGurmukhi) {
    apiParams.isGurmukhi = 1;
  }

  let url = buildApiUrl(apiParams);

  // For testing: manually append isGurmukhi parameter if needed
  if (isGurmukhi) {
    url += url.includes('?') ? '&isGurmukhi=1' : '?isGurmukhi=1';
  }

  url = encodeURI(url);

  return new Promise((resolve, reject) => {
    const json = fetch(url).then((response) => response.json());
    json.then(
      (data) => {
        let { verses } = data;
        let panktiList = [];
        for (const shabad of verses) {
          let highlightPankti = getGurmukhiVerse(shabad);
          if (type === 3) {
            highlightPankti = translationMap['english'](shabad);
          }

          if (isSearchTypeRomanizedFirstLetters) {
            highlightPankti = transliterationMap['english'](shabad);
          }

          const highlightIndex = getHighlightIndices(highlightPankti, q, type);

          panktiList.push({
            pankti: getGurmukhiVerse(shabad),
            translation: translationMap['english'](shabad),
            query: q,
            url: toShabadURL({ shabad, q, type, source }),
            highlightIndex,
            verseId: getVerseId(shabad),
            shabadId: getShabadId(shabad),
            verse: getUnicodeVerse(shabad),
          });
        }
        resolve(panktiList);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
