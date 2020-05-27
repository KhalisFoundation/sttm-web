import { suffixAppName } from './suffix-app-name';

/**
 * @param {object} req - The request obj
 * @param {object} apiResponse - The api response obj
 **/
export const createMetadataFromResponse = (req, apiResponse) => {
  const { path, query } = req;
  switch (path) {
    case '/shabad':
      const { shabadInfo: { shabadName }, verses } = apiResponse;

      // finding shabad object from verses
      const shabad = verses.find(v => v.verseId === shabadName)

      return {
        title: createShabadTitle(shabad),
        description: createShabadDescription(shabad),
      }

    default: return { title: '', description: '' }
  }
}