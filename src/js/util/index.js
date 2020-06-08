/* globals API_URL */
import { unicode } from 'anvaad-js'
import {
  DEFAULT_SEARCH_TYPE,
  DEFAULT_SEARCH_SOURCE,
  SHORT_DOMAIN,
  SEARCH_TYPES,
  LOCAL_STORAGE_KEY_FOR_PREVIOUSLY_READ_ANG,
  BANI_LENGTH_COLS,
  VISRAAM_CONSTANTS,
  LOCAL_STORAGE_KEY_FOR_VISRAAMS,
  LOCAL_STORAGE_KEY_FOR_VISRAAM_SOURCE,
  LOCAL_STORAGE_KEY_FOR_VISRAAMS_STYLE,
  DEFAULT_VISRAAM_SOURCE,
  DEFAULT_VISRAAM_STYLE,
} from '../constants';

import { translationMap, getGurmukhiVerse } from './api/shabad';

import { buildApiUrl } from '@sttm/banidb';

export * from './numbers';
export * from './get-classnames-for-shabad-ratings';

/**
 * Date Time Helpers
 */
export * from './date-time-math';

/**
 * Hukamnama Helpers
 */
export * from './hukamnama';



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

const shortURLSource = (source) => {
  const urlSource = {
    'G': 'g',
    'D': 'd',
    'B': 'v',
    'S': 'gs'
  }
  return urlSource[source];
}

export function shortenURL(url = window.location.href) {
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
    $notification.innerHTML = `${text} <button role="button" aria-label="close" class="toast-notification-close-button">&times;</button>`.trim();

    if (className !== '') {
      $notification.classList.add(className);
    }

    $notification.classList.remove('hidden');

    const hideToast = () => {
      $notification.classList.add('hidden');

      if (className !== '') {
        $notification.classList.remove(className);
      }
      resolve();
    };

    document.querySelector(
      '.toast-notification-close-button'
    ).onclick = hideToast;

    if (delay !== Infinity) {
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
  return parseFloat(value, 10);
};

export const getStringFromLocalStorage = (key, defaultValue = null) => {
  const value = localStorage.getItem(key);
  if (value === null) return defaultValue;
  return value;
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
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
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
 * @param {object} options
 * @param {{ shabadId: string | number, id?: string | number }} options.shabad
 * @param {string} [options.q]
 * @param {string} [options.type]
 * @param {string} [options.source]
 */
export const toShabadURL = ({
  shabad: { shabadId: id, verseId: highlight },
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

export const versesToGurbani = (verses, baniLength = 'extralong', mangalPosition = 'current') => {
  const processedVerses = mangalPosition === 'ceremony' ?
    verses : verses.filter(v => v.mangalPosition === mangalPosition || v.mangalPosition === null);
  return baniLength ?
    processedVerses.map(({ verse, ...v }) => ({
      ...verse,
      ...v,
    })).filter(v => v[BANI_LENGTH_COLS[baniLength]]) :
    processedVerses.map(({ verse, ...v }) => ({
      ...verse,
      ...v,
    }));
}

/**
 *
 * @param {string} baani
 * @param {string} query
 * @param {number} type
 * @returns {array} of [start, end) indices
 */
export const getHighlightIndices = (baani, query, type) => {
  let start = -1;
  let end = -1;
  let highlightIndices = [];

  // Handles " search operator
  let mainQuery = query.replace(/"/g, '');

  //Handles - search operator
  mainQuery = unicode(mainQuery.replace(/[-][ ,\w,),(]*/g, ''), true);

  if (baani === null) {
    return [start, end];
  }

  let baaniWords = baani.split(' ');

  switch (type) {
    // TODO: This is obviously not the best way to handle it.
    case SEARCH_TYPES.ROMANIZED: {
      mainQuery = mainQuery
        .split(' ')
        .map(w => w[0])
        .join('');
    }
    case SEARCH_TYPES.FIRST_LETTERS: // eslint-disable-line no-fallthrough
    case SEARCH_TYPES.FIRST_LETTERS_ANYWHERE: {
      // remove i from start of words
      baaniWords = baaniWords.map(w => (w.startsWith('i') ? w.slice(1) : w));
      const baaniLetters = baaniWords.map(word => word[0]).join('');
      let q = mainQuery.split('+');
      q.forEach(subQuery => {
        if (subQuery.includes('*')) {
          let subWords = subQuery.split('*');
          subWords.forEach(sw => {
            start = baaniLetters.indexOf(sw);
            end = start + sw.length;
            highlightIndices = highlightIndices.concat(numbersRange(start, end - 1, 1));
          });
        } else {
          start = baaniLetters.indexOf(subQuery);
          end = start + subQuery.length;
          highlightIndices = highlightIndices.concat(numbersRange(start, end - 1, 1));
        }
      });
      break;
    }

    case SEARCH_TYPES.ENGLISH_WORD: // eslint-disable-line no-fallthrough
    case SEARCH_TYPES.GURMUKHI_WORD: {
      if (type == SEARCH_TYPES.ENGLISH_WORD) {
        mainQuery = mainQuery.toLowerCase();
        baani = baani.toLowerCase();
        baaniWords = baani.split(" ");
      }

      let q = mainQuery.split('+');
      q = q.map(r => r.trim());
      q.forEach(subQuery => {
        if (subQuery.includes('*')) {
          let subWords = subQuery.split('*');
          subWords = subWords.map(sw => sw.trim());
          subWords = subWords.filter(w => w.length > 0);
          subWords.forEach(akhar => {
            let location = baaniWords.indexOf(akhar);
            location = location === -1 ? baaniWords.findIndex(w => w.includes(akhar)) : location;
            baaniWords[location] = '';
            highlightIndices.push(location);
          });
        } else {
          const [start, end] = getHighlightingEndpoints(baani, subQuery);
          if (start !== -1) {
            highlightIndices = highlightIndices.concat(numbersRange(start, end, 1));
          }
        }
      });
      break;
    }
  }

  return highlightIndices;
};

const getHighlightingEndpoints = (baani, query) => {
  const startChar = baani.indexOf(query);
  let start;
  let end;
  const baaniWords = baani.split(' ');
  let manualCount = 0;
  if (startChar !== -1) {
    for (const wordcount in baaniWords) {
      [...baaniWords[wordcount]].forEach(() => {
        if (manualCount === startChar) {
          start = parseInt(wordcount, 10);
        }
        manualCount++;
      });
      manualCount++; // Counts the space in baani string
    }
    end = start + (query.split(" ").length - 1);
    return [start, end];
  }
  return [-1, -1]
}

export const numbersRange = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

/**
 * Should save ang to localStorage
 * @param {object} data
 * @property {string} type
 * @property {{ source: { id: string }}} info
 */
export const shouldSaveAng = ({ type, info }) =>
  type === 'ang' && info.source.sourceId === 'G';

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
 * @property {{ source: { sourceId: string }}} info
 */
export function toNavURL({ type, info }) {
  switch (type) {
    case 'hukamnama':
      return 'hukamnama?date=';
    case 'shabad':
      return 'shabad?id=';
    case 'ang':
      return `ang?source=${info.source.sourceId}&ang=`;
  }
}

/**
 * Removes any previous text selection &
 * Selects the contents of given div
 * @param {object} selectedDiv
 */
export const makeSelection = selectedDiv => {
  window.getSelection().removeAllRanges();
  var range = document.createRange();
  range.selectNode(selectedDiv);
  window.getSelection().addRange(range);
};

export const getShabadList = (q, { type, source }) => {
  const offset = 1;
  const livesearch = true;
  const url = encodeURI(buildApiUrl({ q, type, source, offset, API_URL, livesearch }));

  return new Promise((resolve, reject) => {
    const json = fetch(url).then((response) => response.json());
    json.then((data) => {
      const { verses } = data;
      let panktiList = [];
      for (const shabad of verses) {
        const highlightPankti = type === 3 ? translationMap["english"](shabad) : getGurmukhiVerse(shabad);
        const highlightIndex = getHighlightIndices(
          highlightPankti,
          q,
          type
        );
        panktiList.push({
          pankti: getGurmukhiVerse(shabad),
          translation: translationMap["english"](shabad),
          query: q,
          url: toShabadURL({ shabad, q, type, source }),
          highlightIndex,
        })
      }
      resolve(panktiList);
    }, (error) => { reject(error); });
  });
}


export const getVisraamClass = (verse, akharIndex, visraams) => {
  let visraamClass = '';

  if (visraams) {
    Object.keys(visraams).forEach((visraamSource) => {
      if (visraams[visraamSource].length) {
        visraams[visraamSource].forEach((visraam) => {
          if (parseInt(visraam.p, 10) === akharIndex) {
            visraamClass += visraam.t === 'v' ?
              ` visraam-${visraamSource}-main ` :
              ` visraam-${visraamSource}-yamki `;
          }
        });
      }
    });
  }
  return visraamClass;
}

export const clearVisraamClass = () => {
  Object.keys(VISRAAM_CONSTANTS.SOURCES).forEach(element => {
    document.body.classList.remove(VISRAAM_CONSTANTS.SOURCE_CLASS(element));
  });
  Object.keys(VISRAAM_CONSTANTS.TYPES).forEach(element => {
    document.body.classList.remove(VISRAAM_CONSTANTS.TYPE_CLASS(element));
  });
}

export const addVisraamClass = () => {
  clearVisraamClass();
  document.body.classList[getBooleanFromLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAMS) ? 'add' : 'remove'](
    VISRAAM_CONSTANTS.CLASS_NAME,
    VISRAAM_CONSTANTS.SOURCE_CLASS(getStringFromLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAM_SOURCE) ||
      DEFAULT_VISRAAM_SOURCE),
    VISRAAM_CONSTANTS.TYPE_CLASS(getStringFromLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAMS_STYLE) ||
      DEFAULT_VISRAAM_STYLE)
  );
}
