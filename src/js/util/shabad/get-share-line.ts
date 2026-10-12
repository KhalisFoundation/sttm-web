import {
  englishTranslationMap,
  hindiTranslationMap,
  steekMap,
  translationMap,
  transliterationMap,
} from '../api/shabad';
import { STEEK_LANGUAGES } from '@/constants';
import { toPlainShareText } from './to-plain-share-text';

type ShareLineOptions = {
  transliterationLanguages?: string[];
  englishTranslationLanguages?: string[];
  hindiTranslationLanguages?: string[];
  steekLanguages?: string[];
  showSpanish?: boolean;
};

/**
 * Text copied or shared for one verse: the Gurmukhi line followed by the
 * transliterations and translations shown on the page, in the same order
 * (English sources, Spanish, steeks, Hindi sources).
 *
 * English, Punjabi and Hindi come only from their selected sources. Reading
 * them from `translationMap` as well would repeat the BaniDB line (#1834).
 * Sources are ordered here the way the page orders them, so callers pass the
 * selections as stored.
 */
export const getShareLine = (
  shabad: any,
  {
    transliterationLanguages = [],
    englishTranslationLanguages = [],
    hindiTranslationLanguages = [],
    steekLanguages = [],
    showSpanish = false,
  }: ShareLineOptions = {}
): string => {
  const mapped = (map: Record<string, (shabad: any) => unknown>, keys: string[]) =>
    keys.map((key) => (map[key] ? map[key](shabad) : ''));

  return [
    shabad.verse.unicode,
    ...mapped(transliterationMap, transliterationLanguages),
    ...mapped(englishTranslationMap, [...englishTranslationLanguages].sort()),
    ...(showSpanish ? [translationMap.spanish(shabad)] : []),
    ...mapped(steekMap, STEEK_LANGUAGES.filter((steek) => steekLanguages.includes(steek))),
    ...mapped(hindiTranslationMap, [...hindiTranslationLanguages].sort()),
  ]
    .map(toPlainShareText)
    .filter(Boolean)
    .join('\n');
};

/** Text for "copy all": every verse's share line, separated by a blank line. */
export const getShareText = (verses: any[] = [], options: ShareLineOptions = {}): string =>
  verses
    .map((verse) => getShareLine(verse, options))
    .filter(Boolean)
    .join('\n\n');
