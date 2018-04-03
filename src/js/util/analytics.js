/* globals ga */

export const CATEGORIES = {
  CLICK: 'click',
  ERROR: 'error',
};

export const ACTIONS = {
  SHARE: 'share',
  LINE_SHARER: 'line-sharer',
  GENERIC_ERROR: 'generic-error',
  GURMUKHI_KEYBOARD: 'gurmukhi-keyboard',
  COPY_SHORT_URL: 'copy-short-url',
  SEARCH_QUERY: 'search-query',
  SEARCH_SOURCE: 'search-source',
  SEARCH_TYPE: 'search-type',
  NO_RESULTS_FOUND: 'no-results-found',
  ANG_NOT_FOUND: 'ang-not-found',
};

export const pageView = page =>
  requestAnimationFrame(() =>
    ga('send', {
      hitType: 'pageview',
      page,
    })
  );

export const event = ({ category = '-', action = '-', label = '-' }) =>
  requestAnimationFrame(() =>
    ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
    })
  );

export const clickEvent = ({ action, label }) =>
  event({ category: CATEGORIES.CLICK, action, label });

export const errorEvent = ({ action, label }) =>
  event({ category: CATEGORIES.ERROR, action, label });
