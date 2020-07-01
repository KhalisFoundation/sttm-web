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
export * from './dom';
export * from '/gurbani';

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


export const isFalsy = value =>
  [null, 'null', '', undefined, 'undefined'].some(v => value === v);


export const toggleItemInArray = (item, arr) =>
  arr.includes(item) ? arr.filter(k => k !== item) : [...arr, item];

export const objectToQueryParams = object =>
  Object.entries(object)
    .filter(([, value]) => [undefined, NaN, null, ''].every(n => n !== value))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
