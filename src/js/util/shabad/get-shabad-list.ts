import { buildApiUrl } from '@sttm/banidb';
import { toShabadURL } from '../url';
import { translationMap, getGurmukhiVerse } from '../api/shabad';
import { getHighlightIndices } from '..';

export const getShabadList = (q, { type, source }) => {
  const offset = 1;
  const livesearch = true;
  const url = encodeURI(buildApiUrl({ q, type, source, offset, API_URL, livesearch }));

  return new Promise((resolve, reject) => {
    const json = fetch(url).then((response) => response.json());
    json.then(
      (data) => {
        const { verses } = data;
        let panktiList = [];
        for (const shabad of verses) {
          const highlightPankti = type === 3 ? translationMap["english"](shabad) : getGurmukhiVerse(shabad);
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
