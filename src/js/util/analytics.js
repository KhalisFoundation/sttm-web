/* globals ga */

export const pageView = page =>
  ga('send', {
    hitType: 'pageview',
    page,
  });
