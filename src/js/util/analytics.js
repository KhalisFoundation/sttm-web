/* globals ga */

export const CATEGORIES = {
  CLICK: 'click',
  ERROR: 'error',
};

export const ACTIONS = {
  SHARE: 'share',
  LINE_SHARER: 'line-sharer',
  MOBILE_LINE_SHARER: 'mobile-line-sharer',
  GENERIC_ERROR: 'generic-error',
  GURMUKHI_KEYBOARD: 'gurmukhi-keyboard',
  COPY_SHORT_URL: 'copy-short-url',
  SEARCH_QUERY: 'search-query',
  SEARCH_SOURCE: 'search-source',
  SEARCH_TYPE: 'search-type',
  NO_RESULTS_FOUND: 'no-results-found',
  ANG_NOT_FOUND: 'ang-not-found',
  SEHAJ_PAATH_LINK: 'sehaj-paath-link',
  RELATED_SHABAD: 'related-shabad',
};

export const pageView = page =>
  requestAnimationFrame(() =>
    ga('send', {
      hitType: 'pageview',
      page,
    })
  );

/**
 * Basic event
 * @param {{ category: string, action: string, label: string }} event
 */
export const event = ({ category = '-', action = '-', label = '-' }) =>
  requestAnimationFrame(() =>
    ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
    })
  );

/**
 * Sets category as click
 * @param {{ action: string, label: string }} event
 */
export const clickEvent = ({ action, label }) =>
  event({ category: CATEGORIES.CLICK, action, label });

/**
 * Sets category as error
 * @param {{ action: string, label: string }} param0
 */
export const errorEvent = ({ action, label }) =>
  event({ category: CATEGORIES.ERROR, action, label });
