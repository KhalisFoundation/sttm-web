import axios from 'axios';
import { buildApiUrl } from '@sttm/banidb';

import { API_URL } from '../../common/constants';

/**
 * @param {object} req - The request obj
 *
 */
export const getMetadataFromRequest = (req) => {
  const { path, query } = req;
  switch (path) {
    case '/shabad': {
      const _url = buildApiUrl({ id: query.id, API_URL });
      const url = 'https:' + _url;
      return axios.get(url);
    }
    // We are returni ng a resolved promise here with falsy value
    // to indicate we get empty data from api.
    default: return Promise.resolve(null);
  }
}