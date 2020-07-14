import { buildApiUrl } from '@sttm/banidb';
import {
  DEFAULT_SEARCH_RAAG,
  DEFAULT_SEARCH_WRITER
} from '@/constants';
import { toShabadURL } from '../url';
import { getHighlightIndices } from '../gurbani';
import { translationMap, getGurmukhiVerse } from '../api/shabad';

export const getShabadList = (q, { type, source, raag = DEFAULT_SEARCH_RAAG, writer = DEFAULT_SEARCH_WRITER }) => {
  const offset = 1;
  const livesearch = true;
  const url = encodeURI(buildApiUrl({ q, type, source, raag, writer, offset, API_URL, livesearch }));

  console.log(url, "URL >>>>>>>>>>>>>>>>>> <<<<<<<<<<<<")
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
            url: toShabadURL({ shabad, q, type, source, raag, writer }),
            highlightIndex,
          })
        }
        resolve(panktiList);
      },
      (error) => { reject(error); });
  });
}
