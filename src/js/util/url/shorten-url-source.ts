/* globals API_URL */
import {
  SHORT_DOMAIN,
} from '../../constants';

import { getParameterByName } from './get-parameter-by-name';

const shortURLSource = (source) => {
  const urlSource = {
    'G': 'g',
    'D': 'd',
    'B': 'v',
    'S': 'gs'
  }
  return urlSource[source];
}

export const shortenURL = (url: string = window.location.href) => {
  const path = window.location.pathname;
  const URL = `http://${SHORT_DOMAIN}`;

  switch (path) {
    case '/shabad':
      return `${URL}/s/${getParameterByName('id')}/${getParameterByName(
        'highlight'
      ) || ''}`;
    case '/ang':
      return `${URL}/${shortURLSource(getParameterByName('source'))}/${getParameterByName('ang')}`;
    case '/hukamnama':
      return `${URL}/h`;
    default:
      return url.replace(window.location.hostname, SHORT_DOMAIN);
  }
}