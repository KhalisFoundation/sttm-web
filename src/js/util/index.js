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

export const toAngURL = ({ ang, source, highlight }) =>
  `/ang?${objectToQueryParams({
    ang,
    source,
    highlight,
  })}`;

// TODO: Extract it out as a dynamic import
export function getEmbedCode({ gurbani, info }) {
  return `
      <style>
        #sttm-root {
          font-size: 18px;
          font-weight: 300;
          font-family: "SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
          background-color: #f5f5f5;
          padding: 10px;
          box-shadow: 0 0 10px -4px black;
          border: 1px solid grey;
          width: 500px;
          height: 500px;
          overflow: scroll;
          border-radius: 5px;
          position: relative;
        }

        #sttm-root .sttm-header {
          position: sticky;
          top: 0;
          display: flex;
          background: linear-gradient(45deg, rgba(1, 102, 155), rgba(243, 156, 29));
          margin: -10px;
          padding: 6px;
          justify-content: space-between;
        }

        
        #sttm-root .sttm-button {
          text-decoration: none;
          text-transform: capitalize;
          display: inline-block;
          border: none;
          padding: 10px;
          margin: 5px;
          border-radius: 5px;
        }

        #sttm-root .sttm-shabad-controls {
          position: sticky;
          top: 64px;
          background: #f5f5f5;
          width: 100%;
        }

        #sttm-root .sttm-button.sttm-enabled {
          background-color: #01669b;
          color: white;
        }

        #sttm-root .sttm-button.sttm-primary {
          background-color: #01669b;
          color: #f39c1d;
        }

        #sttm-root .sttm-line {
          margin: 10px;
        }
        
        #sttm-root .sttm-line .sttm-baani {
          font-size: 1.3em;
        }
        
        #sttm-root .sttm-line .sttm-transliteration {
          display: none;
          color: #01669b;
          font-style: italic;
        }
        
        #sttm-root .sttm-line .sttm-translation {
          display: none;
          color: grey;
          border-left: .1em solid grey;
          padding-left: 1em;
          margin: .25em;
        }

        #sttm-root .sttm-line .sttm-translation.sttm-enabled,
        #sttm-root .sttm-line .sttm-transliteration.sttm-enabled {
          display: block;
        }

        #sttm-root .sttm-shabad-meta {

        }
        #sttm-root .sttm-shabad-content {

        }
      </style>
      <div id="sttm-root">
        <div class="sttm-header">
          <img height="50" src="https://sikhitothemax.org/assets/images/sttm_icon.png" alt="SikhiToTheMax Logo"/>
          <a class="sttm-button sttm-primary" href="https://sikhitothemax.org/shabad?id=${
            info.id
          }">Open in SikhiToTheMax</a>
        </div>
        <div class="sttm-shabad-controls"></div>
        <h3 class="sttm-shabad-meta">
          ${info.writer.english} | 
          ${info.source.english}: 
          <a href="https://sikhitothemax.org/ang?ang=${
            info.source.pageno
          }&source=${info.source.id}">
            ${info.source.pageno}
          </a>
        </h3>
        <div class="sttm-shabad-content">
        ${gurbani
          .map(
            ({ shabad }) =>
              `
              <div class="sttm-line">
                <div class="sttm-baani">${shabad.gurbani.unicode}</div>
                <div class="sttm-transliteration">${
                  shabad.transliteration
                }</div>
                <div class="sttm-translation sttm-english sttm-enabled">${
                  shabad.translation.english.ssk
                }</div>
                <div class="sttm-translation sttm-punjabi">${
                  shabad.translation.punjabi.bms.unicode
                }</div>
                <div class="sttm-translation sttm-spanish">${
                  shabad.translation.spanish
                }</div>
              </div>
        `
          )
          .join('')}
        </div>
      </div>
      <script async src="${window.location.origin}/embed.js"></script>
  `;
}
