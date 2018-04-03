import {
  DEFAULT_SEARCH_TYPE,
  DEFAULT_SEARCH_SOURCE,
  SHORT_DOMAIN,
} from '../constants';

export const throwError = (msg, err) => {
  // eslint-disable-next-line no-console
  console.warn(err);
  throw new Error(err);
};

export function getParameterByName(_name, url = window.location.href) {
  const name = _name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function getQueryParams() {
  const qs = document.location.search.replace(/\+/g, ' ');
  const params = {};
  const re = /[?&]?([^=]+)=([^&]*)/g;
  let tokens;

  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

export function shortenURL(url = window.location.href) {
  const path = window.location.pathname;
  const URL = `http://${SHORT_DOMAIN}`;

  switch (path) {
    case '/shabad':
      return `${URL}/s/${getParameterByName('id')}`;
    case '/ang':
      return `${URL}/a/${getParameterByName('ang')}`;
    case '/hukamnama':
      return `${URL}/h`;
    default:
      return url.replace(window.location.hostname, SHORT_DOMAIN);
  }
}

export const showToast = (text, delay = 2500) =>
  new Promise(resolve => {
    const copyURLconfirm = document.getElementById('toast-notification');
    copyURLconfirm.innerText = text;
    copyURLconfirm.classList.remove('hidden');

    setTimeout(() => {
      copyURLconfirm.classList.add('hidden');
      resolve();
    }, delay);
  });

export const copyToClipboard = text =>
  new Promise((resolve, reject) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.textContent = text;
      document.body.appendChild(textarea);

      const selection = document.getSelection();
      const range = document.createRange();
      range.selectNode(textarea);
      selection.removeAllRanges();
      selection.addRange(range);

      const result = document.execCommand('copy');

      selection.removeAllRanges();
      document.body.removeChild(textarea);

      if (result) {
        resolve();
      } else {
        throw new Error('Failed to copy');
      }
    } catch (e) {
      reject(e);
    }
  });

export const getArrayFromLocalStorage = (key, defaultValue = []) => {
  const value = localStorage.getItem(key);

  if ([null, 'null', '', undefined, 'undefined'].some(v => value === v)) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }

  try {
    return JSON.parse(value);
  } catch (err) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
};

export const getNumberFromLocalStorage = (key, defaultValue = null) => {
  const value = localStorage.getItem(key);
  if (value === null) return defaultValue;
  return parseFloat(value, 10);
};

export const getBooleanFromLocalStorage = (key, defaultValue = null) => {
  const value = localStorage.getItem(key);
  if (value === null) return defaultValue;
  return value === 'true';
};

export const saveToLocalStorage = (key, value) =>
  requestAnimationFrame(() => localStorage.setItem(key, value));

export const toggleItemInArray = (item, arr) =>
  arr.includes(item) ? arr.filter(k => k !== item) : [...arr, item];

export function navLink(type, source) {
  switch (type) {
    case 'hukamnama':
    case 'shabad':
      return 'shabad?id=';
    case 'ang':
      return `ang?source=${source}&ang=`;
  }
}

export const objectToQueryParams = object =>
  Object.entries(object)
    .filter(([, value]) => [undefined, NaN, null, ''].every(n => n !== value))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

export const toSearchURL = ({
  query: q,
  type = DEFAULT_SEARCH_TYPE,
  source = DEFAULT_SEARCH_SOURCE,
  offset = '',
}) => `/search?${objectToQueryParams({ q, type, source, offset })}`;

export const toShabadURL = ({
  shabad: { shabadid: id, id: highlight },
  q,
  type = undefined,
  source = undefined,
}) =>
  `/shabad?${objectToQueryParams({
    id,
    q,
    type,
    source,
    highlight,
  })}`;
