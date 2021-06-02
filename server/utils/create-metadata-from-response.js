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
      const { shabadInfo, verses } = isKeyExists(apiResponse.data, 'shabadIds') ? apiResponse.data.shabads[0] : apiResponse.data;     

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
      const title = `Ang ${getAng(req)} of ${getSource(req)}`;
      const description = `Read page number ${getAng(req)} of ${getSource(req)} now.`

      return {
        title,
        description
      }
    }

    default: return { title: '', description: '' }
  }
}

export const isKeyExists = (object, key) => {
  return object.hasOwnProperty(key)
}