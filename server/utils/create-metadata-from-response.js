import { suffixAppName } from './suffix-app-name';
import { createShabadTitle, createShabadDescription } from './shabads';

/**
 * @param {object} req - The request obj
 * @param {object} apiResponse - The api response obj
 **/
export const createMetadataFromResponse = (req, apiResponse) => {
  const { path, query } = req;
  switch (path) {
    case '/shabad':
      const { shabadInfo, verses } = apiResponse.data;
      const { shabadName } = shabadInfo;

      // getting shabad object from verses
      const shabad = verses.find(v => v.verseId === shabadName)

      const title = createShabadTitle(shabad);
      const description = createShabadDescription(shabad, shabadInfo);

      return {
        title,
        description
      }

    default: return { title: '', description: '' }
  }
}