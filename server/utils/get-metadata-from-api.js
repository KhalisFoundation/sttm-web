import { buildApiUrl } from '@sttm/banidb';
import axios from 'axios';

import { API_URL } from '../../common/constants';


const getAng = req => req.query.ang;
const getSource = req => SOURCES[req.query.source || 'G'];

/**
 * @param {object} path - The request url path
 * @param {queryParams} object - The request url query params
 */
export const getMetadataFromApi = (req) => {
  const { path, query } = req;
  switch (path) {
    case '/shabad': {
      const _url = buildApiUrl({ id: query.id, API_URL });
      const url = 'https:' + _url;
      return axios.get(url);
    }
  }
  return 'shabad';
}