import { createShabadTitle, createShabadDescription } from './shabads';
import { getAng, getSource } from './angs';

/**
 * @param {object} req - The request obj
 * @param {object} apiResponse - The api response obj
 **/
export const createMetadataFromResponse = (req, apiResponse) => {
  const { path } = req;
  switch (path) {
    case '/shabad': {
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
    }

    case '/ang': {
      return {
        title: `Ang ${getAng(req)} of ${getSource(req)}`,
        description: `Read page number ${getAng(req)} of ${getSource(
          req
        )} now.`
      }
    }

    default: return { title: '', description: '' }
  }
}