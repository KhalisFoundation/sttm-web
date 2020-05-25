import { buildApiUrl } from '@sttm/banidb';
import axios from 'axios';
import querystring from 'querystring';

import { API_URL } from '../../common/constants';

const getAng = req => req.query.ang;
const getSource = req => SOURCES[req.query.source || 'G'];

/**
 * @param {object} path - The request url path
 * @param {queryParams} object - The request url query params
 */
export const createMetadataFromRequest = (req) => {
  const { path, query } = req;
  // switch (path) {
  //   '/shabad':
  // }
  const queryParams = querystring.parse(req.query);
  const url = buildApiUrl({ id: query.id, API_URL });
  console.log(url, "query params id");
  // switch (path) {
  //   case '/shabad': return axios.get()
  // }
  return 'shabad';
}