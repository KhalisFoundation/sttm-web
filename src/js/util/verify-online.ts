// Probe the app's data API health endpoint (banidb `/health`, which returns
// `{ ok: true }` with permissive CORS) and trust the actual response, not mere
// request completion. This confirms the backend the app depends on is really
// reachable — a captive portal or a same-origin SPA fallback can't fake it.
const apiBase =
  (typeof API_URL === 'string' && API_URL) || 'https://api.banidb.com/v2/';
const HEALTH_URL = `${apiBase}health`;

export async function verifyOnline(timeoutMs = 5000): Promise<boolean> {
  if (typeof window === 'undefined' || typeof fetch === 'undefined') return true;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${HEALTH_URL}?_=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
