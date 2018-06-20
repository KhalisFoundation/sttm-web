import {
  DEFAULT_SEARCH_TYPE,
  DEFAULT_SEARCH_SOURCE,
  SHORT_DOMAIN,
  SEARCH_TYPES,
  LOCAL_STORAGE_KEY_FOR_PREVIOUSLY_READ_ANG,
} from '../constants';

/**
 * Throws given error. This is a workaround for absence of throw expressions.
 * Calling this function lets you throw an error inline (eg. JSX)
 *
 * @param {string} msg
 * @param {*} err
 */
export const throwError = (msg, err) => {
  // eslint-disable-next-line no-console
  console.warn(err);
  throw new Error(err);
};

/**
 * URL QueryParam reader
 *
 * @param {string} _name of parameter to read from query params
 * @param {string} [url=window.location.href] to read query params from
 * @returns {string}
 */
export function getParameterByName(_name, url = window.location.href) {
  const name = _name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Returns query param object derived from a given url
 * @param {string} str containing query params
 * @returns {object}
 */
export function getQueryParams(str = document.location.search) {
  const qs = str.replace(/\+/g, ' ');
  const params = {};
  const re = /[?&]?([^=]+)=([^&]*)/g;
  let tokens;

  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

/**
 * sttm.co URL shortner service
 *
 * @param {string} url
 */
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

/**
 * Shows a toast
 *
 * @param {string} text to display in notification toast
 * @param {number} delay (in ms) to wait before hiding toast. Pass Infinity if you want to hide it on user action.
 * @returns {Promise} which resolves after hiding the toast.
 */
export const showToast = (text, delay = 2500, className = '') =>
  new Promise(resolve => {
    const $notification = document.getElementById('toast-notification');
    $notification.innerText = text;
    $notification.classList.add(className);
    $notification.classList.remove('hidden');
    const hideToast = () => {
      $notification.classList.add('hidden');
      $notification.classList.remove(className);
      resolve();
    };

    if (delay === Infinity) {
      $notification.addEventListener('click', hideToast);
    } else {
      setTimeout(hideToast, delay);
    }
  });

/**
 * Uses new navigator.clipboard.writeText, fallsback to old-school method
 * @param {string} text to be copied into clipboard
 * @returns {Promise} which resolves if successfuly copied
 */
export const copyToClipboard = text =>
  new Promise((resolve, reject) => {
    if ('clipboard' in navigator && 'writeText' in navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(resolve)
        .catch(reject);
      return;
    }

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

export const isFalsy = value =>
  [null, 'null', '', undefined, 'undefined'].some(v => value === v);

export const getArrayFromLocalStorage = (key, defaultValue = []) => {
  const value = localStorage.getItem(key);

  if (isFalsy(value)) {
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
  return parseFloat(value);
};

export const getBooleanFromLocalStorage = (key, defaultValue = null) => {
  const value = localStorage.getItem(key);
  if (value === null) return defaultValue;
  return value === 'true';
};

/**
 * Saves to localStorage in next animation frame.
 *
 * @param {string} key
 * @param {string} value
 */
export const saveToLocalStorage = (key, value) =>
  requestAnimationFrame(() => localStorage.setItem(key, value));

export const toggleItemInArray = (item, arr) =>
  arr.includes(item) ? arr.filter(k => k !== item) : [...arr, item];

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
}) =>
  `/search?${objectToQueryParams({
    q: encodeURIComponent(q),
    type,
    source,
    offset,
  })}`;

/**
 *
 * @param {object} data
 * @property {{ shabadid: string, id: string }} shabad
 * @property {string} [q]
 * @property {string} [type]
 * @property {string} [source]
 */
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

export const toAngURL = ({ ang, source, highlight }) =>
  `/ang?${objectToQueryParams({
    ang,
    source,
    highlight,
  })}`;

/**
 * @sttm/banidb API v2 to v1 transformer
 */
export const versesToGurbani = verses =>
  verses.map(({ verse, ...v }, i) => ({
    shabad: {
      ...v,
      gurbani: verse,
      id: v.lineNo || '' + i,
      transliteration: v.transliteration.english,
    },
  }));

/**
 *
 * @param {string} baani
 * @param {string} query
 * @param {number} type
 * @returns {array} of [start, end) indices
 */
export const getHighlightIndices = (baani, query, type) => {
  let start = -1,
    end = -1;
  let baaniWords = baani.split(' ');

  switch (type) {
    // TODO: This is obviously not the best way to handle it.
    case SEARCH_TYPES.ROMANIZED: {
      query = query
        .split(' ')
        .map(w => w[0])
        .join('');
    }
    case SEARCH_TYPES.FIRST_LETTERS: // eslint-disable-line no-fallthrough
    case SEARCH_TYPES.FIRST_LETTERS_ANYWHERE: {
      // remove i from start of words
      baaniWords = baaniWords.map(w => (w.startsWith('i') ? w.slice(1) : w));

      start = baaniWords
        .map(word => word[0])
        .join('')
        .indexOf(query);
      end = start + query.length;
      break;
    }
    case SEARCH_TYPES.GURMUKHI_WORD: {
      const q = query.split(' ');
      start = baaniWords.indexOf(q[0]);
      start =
        start === -1 ? baaniWords.findIndex(w => w.includes(q[0])) : start;
      end = start + q.length;
      break;
    }
  }

  return [start, start === -1 ? 0 : end];
};

/**
 * Should save ang to localStorage
 * @param {object} data
 * @property {string} type
 * @property {{ source: { id: string }}} info
 */
export const shouldSaveAng = ({ type, info }) =>
  type === 'ang' && info.source.id === 'G';

/**
 * Previously read ang
 * @returns {number}
 */
export const readAng = () =>
  parseInt(localStorage.getItem(LOCAL_STORAGE_KEY_FOR_PREVIOUSLY_READ_ANG));

/**
 * Saves ang to localStorage
 * @param {number} ang
 */
export const saveAng = ang =>
  saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_PREVIOUSLY_READ_ANG, ang);

/**
 * Generates link based on type and source
 * @param {object} data
 * @property {string} type
 * @property {{ source: { id: string }}} info
 */
export function toNavURL({ type, info }) {
  switch (type) {
    case 'hukamnama':
    case 'shabad':
      return 'shabad?id=';
    case 'ang':
      return `ang?source=${info.source.id}&ang=`;
  }
}
