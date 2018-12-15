export const CATEGORIES = {
  CLICK: 'click',
  ERROR: 'error',
};

export enum ACTIONS {
  SHARE = 'share',
  LINE_SHARER = 'line-sharer',
  GENERIC_ERROR = 'generic-error',
  GURMUKHI_KEYBOARD = 'gurmukhi-keyboard',
  COPY_SHORT_URL = 'copy-short-url',
  SEARCH_QUERY = 'search-query',
  SEARCH_SOURCE = 'search-source',
  SEARCH_TYPE = 'search-type',
  NO_RESULTS_FOUND = 'no-results-found',
  ANG_NOT_FOUND = 'ang-not-found',
  SEHAJ_PAATH_LINK = 'sehaj-paath-link',
}

export const pageView = (page: string) =>
  requestAnimationFrame(() =>
    window.ga('send', {
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
    window.ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
    })
  );

export const clickEvent = ({
  action,
  label,
}: {
  action: ACTIONS | string;
  label: any;
}) => event({ category: CATEGORIES.CLICK, action, label });

export const errorEvent = ({
  action,
  label,
}: {
  action: ACTIONS | string;
  label: any;
}) => event({ category: CATEGORIES.ERROR, action, label });
