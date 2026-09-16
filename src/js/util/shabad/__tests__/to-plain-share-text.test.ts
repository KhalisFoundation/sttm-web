import { toPlainShareText } from '../to-plain-share-text';

describe('toPlainShareText()', () => {
  it('returns trimmed strings', () => {
    expect(toPlainShareText('  hello  ')).toBe('hello');
  });

  it('returns empty string for nullish values', () => {
    expect(toPlainShareText(null)).toBe('');
    expect(toPlainShareText(undefined)).toBe('');
  });

  it('prefers unicode on translation/steek objects', () => {
    expect(
      toPlainShareText({
        gurmukhi: 'gurmukhi text',
        unicode: 'ਯੂਨੀਕੋਡ',
      })
    ).toBe('ਯੂਨੀਕੋਡ');
  });

  it('falls back to gurmukhi when unicode is empty', () => {
    expect(
      toPlainShareText({
        gurmukhi: 'gurmukhi text',
        unicode: '  ',
      })
    ).toBe('gurmukhi text');
  });

  it('does not stringify leftover objects as [object Object]', () => {
    expect(toPlainShareText({ foo: 'bar' })).toBe('');
    expect(toPlainShareText({})).toBe('');
  });
});
