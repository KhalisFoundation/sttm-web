import { verifyOnline } from '../verify-online';

describe('verifyOnline', () => {
  const realFetch = global.fetch;

  afterEach(() => {
    global.fetch = realFetch;
  });

  it('returns true when the request resolves (reachable)', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
    await expect(verifyOnline()).resolves.toBe(true);
  });

  it('returns false when the request rejects (network error)', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network'));
    await expect(verifyOnline()).resolves.toBe(false);
  });

  it('issues a no-store same-origin request', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true } as Response);
    global.fetch = fetchMock;
    await verifyOnline();
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain('/favicon.ico');
    expect(init).toMatchObject({ method: 'HEAD', cache: 'no-store' });
  });
});
