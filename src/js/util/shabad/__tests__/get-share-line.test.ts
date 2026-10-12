import { getShareLine } from '../get-share-line';

const verse = {
  verse: { unicode: 'ਗੁਰਮੁਖੀ', gurmukhi: 'gurmuKI' },
  transliteration: { en: 'gurmukhi', hi: 'गुरमुखी' },
  translation: {
    en: { bdb: 'English BaniDB', ms: 'English Manmohan Singh', ssk: 'English Sant Singh Khalsa' },
    es: { sn: 'Spanish' },
    hi: { ss: 'Hindi Sahib Singh', sts: 'Hindi Sant Singh' },
    pu: {
      bdb: { unicode: 'Punjabi BaniDB', gurmukhi: 'pMjwbI' },
      ss: { unicode: 'Punjabi Sahib Singh', gurmukhi: 'pMjwbI' },
      ft: { unicode: 'Punjabi Fareedkot', gurmukhi: 'pMjwbI' },
    },
  },
};

describe('getShareLine()', () => {
  it('returns only the Gurmukhi line when nothing else is shown', () => {
    expect(getShareLine(verse)).toBe('ਗੁਰਮੁਖੀ');
  });

  it('copies the default BaniDB English translation once', () => {
    expect(
      getShareLine(verse, {
        transliterationLanguages: ['english'],
        englishTranslationLanguages: ['BaniDB'],
      })
    ).toBe(['ਗੁਰਮੁਖੀ', 'gurmukhi', 'English BaniDB'].join('\n'));
  });

  it('copies steeks as text, not [object Object]', () => {
    const text = getShareLine(verse, {
      englishTranslationLanguages: ['BaniDB'],
      steekLanguages: ['sahib singh'],
    });

    expect(text).toBe(['ਗੁਰਮੁਖੀ', 'English BaniDB', 'Punjabi Sahib Singh'].join('\n'));
    expect(text).not.toContain('[object Object]');
  });

  it('copies only the selected sources, in the order the page shows them', () => {
    expect(
      getShareLine(verse, {
        englishTranslationLanguages: ['manmohan singh', 'sant singh khalsa'],
        hindiTranslationLanguages: ['sahib singh'],
        steekLanguages: ['fareedkot'],
        showSpanish: true,
      })
    ).toBe(
      [
        'ਗੁਰਮੁਖੀ',
        'English Manmohan Singh',
        'English Sant Singh Khalsa',
        'Spanish',
        'Punjabi Fareedkot',
        'Hindi Sahib Singh',
      ].join('\n')
    );
  });

  it('skips sources with no text for the verse and unknown sources', () => {
    expect(
      getShareLine(verse, {
        englishTranslationLanguages: ['BaniDB', 'prof sahib singh', 'not a source'],
      })
    ).toBe(['ਗੁਰਮੁਖੀ', 'English BaniDB'].join('\n'));
  });
});
