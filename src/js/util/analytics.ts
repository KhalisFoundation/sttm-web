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
  SEHAJ_PAATH_LINK: 'sehaj-paath-link',
  RELATED_SHABAD: 'related-shabad',
  JAPJI_SAHIB_LINK: 'japji-sahib-link',
  REHRAAS_SAHIB_LINK: 'rehraas-sahib-link',
  SOHILAA_SAHIB_LINK: 'sohilaa-sahib-link'
};

interface IEventArguments {
  category?: string,
  action: string,
  label: string
}

export const pageView = page =>
  requestAnimationFrame(() =>
    ga('send', {
      hitType: 'pageview',
      page,
    })
  );

// Basic event
export const event = ({ category = '-', action = '-', label = '-' }: IEventArguments) =>
  requestAnimationFrame(() =>
    ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
    })
  );

//Sets category as click
export const clickEvent = ({ action, label }: IEventArguments) =>
  event({ category: CATEGORIES.CLICK, action, label });

//Sets category as error
export const errorEvent = ({ action, label }: IEventArguments) =>
  event({ category: CATEGORIES.ERROR, action, label });
