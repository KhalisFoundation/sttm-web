import {
  AI_Translation_Entry,
  AI_Translation_Padarth,
  AI_Translation_Text,
  AI_Translation_Word,
} from '@/types/shabad-review';

export const AI_TRANSLATION_TYPES = {
  PSS: 'pss',
  PSS_PADARTH: 'pss-padarth',
  PSS_SIMPLE: 'pss_simple',
} as const;

/**
 * The `/api/ai-translations` response keys each verse to a list of entries,
 * one per translation type, eg:
 * { "3": [{ type: 'pss', translation_text, ... }, { type: 'pss-padarth', words: [...] }] }
 */
const getEntries = (verseEntries?: AI_Translation_Entry[]): AI_Translation_Entry[] =>
  Array.isArray(verseEntries) ? verseEntries : [];

const getTextEntries = (
  verseEntries: AI_Translation_Entry[] | undefined,
  type: AI_Translation_Text['type']
): AI_Translation_Text[] =>
  getEntries(verseEntries).filter(
    (entry): entry is AI_Translation_Text => entry.type === type
  );

export const getPssEntries = (verseEntries?: AI_Translation_Entry[]): AI_Translation_Text[] =>
  getTextEntries(verseEntries, AI_TRANSLATION_TYPES.PSS);

export const getPssSimpleEntries = (verseEntries?: AI_Translation_Entry[]): AI_Translation_Text[] =>
  getTextEntries(verseEntries, AI_TRANSLATION_TYPES.PSS_SIMPLE);

export const getPadarthWords = (verseEntries?: AI_Translation_Entry[]): AI_Translation_Word[] =>
  getEntries(verseEntries)
    .filter(
      (entry): entry is AI_Translation_Padarth =>
        entry.type === AI_TRANSLATION_TYPES.PSS_PADARTH
    )
    .flatMap((entry) => entry.words || []);

const joinText = (entries: AI_Translation_Text[]): string =>
  entries
    .map((entry) => entry.translation_text)
    .filter(Boolean)
    .join(' ')
    .trim();

export const getPssText = (verseEntries?: AI_Translation_Entry[]): string =>
  joinText(getPssEntries(verseEntries));

export const getPssSimpleText = (verseEntries?: AI_Translation_Entry[]): string =>
  joinText(getPssSimpleEntries(verseEntries));

export const getPssTranslationId = (verseEntries?: AI_Translation_Entry[]): number => {
  const [firstEntry] = getPssEntries(verseEntries);
  return firstEntry ? firstEntry.translation_id : 0;
};

export const isScholarReviewed = (verseEntries?: AI_Translation_Entry[]): boolean => {
  const [firstEntry] = getPssEntries(verseEntries);
  return Boolean(firstEntry && firstEntry.is_scholar_reviewed);
};

/**
 * Each padarth word is a JSON string:
 * { "word": { "unicode": "ਆਦਿ", "ascii": "Awid" }, "english_meaning": "from the beginning" }
 */
export const getPadarthText = (verseEntries?: AI_Translation_Entry[]): string =>
  getPadarthWords(verseEntries)
    .slice()
    .sort((a, b) => a.translation_id - b.translation_id)
    .map(({ translation_text }) => {
      try {
        const parsed = JSON.parse(translation_text);
        return `${parsed.word.unicode} - ${parsed.english_meaning}`;
      } catch (error) {
        console.error('Unable to parse padarth translation:', error);
        return '';
      }
    })
    .filter(Boolean)
    .join(',  ');
