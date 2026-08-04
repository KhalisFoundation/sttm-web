export async function verifyOnline(timeoutMs = 5000): Promise<boolean> {
  if (typeof window === 'undefined' || typeof fetch === 'undefined') return true;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(`/favicon.ico?_=${Date.now()}`, {
      method: 'HEAD',
      cache: 'no-store',
      signal: controller.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
