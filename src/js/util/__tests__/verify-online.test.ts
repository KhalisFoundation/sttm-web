import { verifyOnline } from '../verify-online';

describe('verifyOnline', () => {
  const realFetch = global.fetch;

  afterEach(() => {
    global.fetch = realFetch;
  });

  it('returns true on an ok (2xx) response', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
    await expect(verifyOnline()).resolves.toBe(true);
  });

  it('returns false on a non-ok response (e.g. 500 or a captive portal)', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false } as Response);
    await expect(verifyOnline()).resolves.toBe(false);
  });

  it('returns false when the request rejects (network error / CORS)', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network'));
    await expect(verifyOnline()).resolves.toBe(false);
  });

  it('probes the API health endpoint with a no-store GET', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true } as Response);
    global.fetch = fetchMock;
    await verifyOnline();
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain('/health');
    expect(init).toMatchObject({ method: 'GET', cache: 'no-store' });
  });
});
