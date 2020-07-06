/* globals ga */
export const pageView = page =>
  requestAnimationFrame(() =>
    ga('send', {
      hitType: 'pageview',
      page,
    })
  );
