/* globals API_URL */
import {
  SEARCH_TYPES,
  BANI_LENGTH_COLS,
} from '../constants';


export * from './numbers';
export * from './date-time-math';
export * from './hukamnama';
export * from './routes';
export * from './url';
export * from './localstorage';
export * from './ang';
export * from './shabad';
export * from './visraam';


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


export const toggleItemInArray = (item, arr) =>
  arr.includes(item) ? arr.filter(k => k !== item) : [...arr, item];

export const objectToQueryParams = object =>
  Object.entries(object)
    .filter(([, value]) => [undefined, NaN, null, ''].every(n => n !== value))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');


export const versesToGurbani = (verses, baniLength = 'extralong', mangalPosition = 'current') => {
  const processedVerses = mangalPosition === 'ceremony' ?
    verses : verses.filter(v => v.mangalPosition === mangalPosition || v.mangalPosition === null);

  return baniLength ?
    processedVerses.map(({ verse, ...v }) => ({
      ...verse,
      ...v,
    })).filter(v => v[BANI_LENGTH_COLS[baniLength]])
    :
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
  mainQuery = mainQuery.replace(/[-][ ,\w,),(]*/g, '');

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