import { suffixAppName } from './suffix-app-name';
/**
 * @param {object} req - The request obj
 * @param {object} apiResponse - The api response obj
 **/
export const createMetadataFromResponse = (req, apiResponse) => {
  const { path, query } = req;
  switch (path) {
    case '/shabad':
      const { shabadInfo } = apiResponse.data;
      const sourceName = shabadInfo.source && shabadInfo.source.english;
      const authorName = shabadInfo.writer && shabadInfo.writer.english;

      return {
        title: '',
        description: `Read shabad${authorName ? ` by ${authorName}` : ''}${sourceName ? ` from ${sourceName}` : ''}`
      }

    default: return { title: '', description: '' }
  }
}