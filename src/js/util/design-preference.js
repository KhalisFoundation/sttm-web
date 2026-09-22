// Cross-site "which design" preference, shared with next.sikhitothemax.org via a
// cookie scoped to the parent domain (localStorage can't cross the two origins).
// `sttm_design=new` means the user opted into the new design, so redirect them
// there — preserving the path — on future visits to this old site. Cleared by
// "Go back to previous design" on the new site. See KhalisFoundation/sttm-next#151.

const COOKIE = 'sttm_design';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const isProdHost = () => {
  const host = window.location.hostname;
  return host === 'sikhitothemax.org' || host === 'www.sikhitothemax.org';
};

// Scope to `.sikhitothemax.org` so both hosts share it; omit the domain on any
// other host (localhost / previews) so it still sets for local testing.
const domainAttr = () =>
  window.location.hostname.endsWith('sikhitothemax.org')
    ? '; domain=.sikhitothemax.org'
    : '';

export const prefersNewDesign = () =>
  document.cookie.split('; ').some((c) => c === `${COOKIE}=new`);

/** Remember the user opted into the new design (set on the "Try it now" click). */
export const rememberNewDesign = () => {
  document.cookie = `${COOKIE}=new${domainAttr()}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
};

/**
 * If the user opted into the new design, redirect to it (same path + query) and
 * return true. Only on the production host, and with a `?design=old` escape
 * hatch so the old site stays reachable. Never throws — a redirect check must
 * not block the app.
 */
export const maybeRedirectToNewDesign = () => {
  try {
    if (!isProdHost()) return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get('design') === 'old') return false;
    if (!prefersNewDesign()) return false;
    const { pathname, search, hash } = window.location;
    window.location.replace(`https://next.sikhitothemax.org${pathname}${search}${hash}`);
    return true;
  } catch (e) {
    return false;
  }
};
