import { getMahankoshWordUrl } from '../get-mahankosh-word-url';

describe('getMahankoshWordUrl()', () => {
  const API = '//api.banidb.com/v2/';

  it('builds a plain word lookup', () => {
    expect(getMahankoshWordUrl(API, 'hukam')).toBe(
      '//api.banidb.com/v2/kosh/word/hukam'
    );
  });

  it('keeps path-breaking characters part of the word', () => {
    expect(getMahankoshWordUrl(API, 'is/wpY')).toBe(
      '//api.banidb.com/v2/kosh/word/is%2FwpY'
    );
  });

  it('encodes query and fragment characters', () => {
    expect(getMahankoshWordUrl(API, 'h#k?m')).toBe(
      '//api.banidb.com/v2/kosh/word/h%23k%3Fm'
    );
  });

  it('trims whitespace around the word', () => {
    expect(getMahankoshWordUrl(API, ' hukam ')).toBe(
      '//api.banidb.com/v2/kosh/word/hukam'
    );
  });

  it('returns an empty url for missing words', () => {
    expect(getMahankoshWordUrl(API, undefined)).toBe('');
    expect(getMahankoshWordUrl(API, null)).toBe('');
    expect(getMahankoshWordUrl(API, '')).toBe('');
    expect(getMahankoshWordUrl(API, '   ')).toBe('');
  });
});
