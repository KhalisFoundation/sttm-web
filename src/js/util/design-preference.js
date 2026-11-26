// Cross-site "which design" preference, shared with next.sikhitothemax.org via a
// cookie scoped to the parent domain (localStorage can't cross the two origins).
// `sttm_design=new` means the user opted into the new design, so redirect them
// there — preserving the path — on future visits to this old site. Cleared by
// "Go back to previous design" on the new site. See KhalisFoundation/sttm-next#151.

const COOKIE = 'sttm_design';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Host of the new design. Its routes match this site's, path for path. */
export const NEW_DESIGN_HOST = 'next.sikhitothemax.org';

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
 * The given page of this site (path, query and hash) as a path on the new
 * design, which serves the same routes. Drops the `?design=old` escape hatch,
 * which means nothing there.
 */
export const newDesignPath = ({ pathname, search, hash }) => {
  const params = new URLSearchParams(search);
  if (!params.has('design')) return `${pathname}${search}${hash}`;
  params.delete('design');
  const query = params.toString();
  return `${pathname}${query ? `?${query}` : ''}${hash}`;
};

/** Full URL of the given page in the new design. */
export const newDesignUrl = (location) =>
  `https://${NEW_DESIGN_HOST}${newDesignPath(location)}`;

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
    window.location.replace(newDesignUrl(window.location));
    return true;
  } catch (e) {
    return false;
  }
};
