import { buildApiUrl } from '@sttm/banidb';
import { SEARCH_TYPES } from '@/constants';
import { toShabadURL } from '../url';
import { translationMap, transliterationMap, getGurmukhiVerse } from '../api/shabad';
import { getHighlightIndices } from '../gurbani';

export const getShabadList = (q, { type, source, writer }) => {
  const offset = 1;
  const isSearchTypeRomanizedFirstLetters = type === SEARCH_TYPES.ROMANIZED_FIRST_LETTERS_ANYWHERE;
  const livesearch = !isSearchTypeRomanizedFirstLetters;
  const url = encodeURI(buildApiUrl({ q, type, source, writer, offset, API_URL, livesearch }));

  return new Promise((resolve, reject) => {
    const json = fetch(url).then((response) => response.json());
    json.then(
      (data) => {
        const { verses } = data;
        let panktiList = [];
        for (const shabad of verses) {
          let highlightPankti = getGurmukhiVerse(shabad);
          if (type === 3) {
            highlightPankti = translationMap["english"](shabad);
          }

          if (isSearchTypeRomanizedFirstLetters) {
            highlightPankti = transliterationMap["english"](shabad);
          }

          const highlightIndex = getHighlightIndices(
            highlightPankti,
            q,
            type
          );

          panktiList.push({
            pankti: getGurmukhiVerse(shabad),
            translation: translationMap["english"](shabad),
            query: q,
            url: toShabadURL({ shabad, q, type, source }),
            highlightIndex,
          })
        }
        resolve(panktiList);
      },
      (error) => { reject(error); });
  });
}
