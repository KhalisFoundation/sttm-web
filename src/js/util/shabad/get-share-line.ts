import {
  englishTranslationMap,
  hindiTranslationMap,
  steekMap,
  translationMap,
  transliterationMap,
} from '../api/shabad';
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
    ...mapped(englishTranslationMap, englishTranslationLanguages),
    ...(showSpanish ? [translationMap.spanish(shabad)] : []),
    ...mapped(steekMap, steekLanguages),
    ...mapped(hindiTranslationMap, hindiTranslationLanguages),
  ]
    .map(toPlainShareText)
    .filter(Boolean)
    .join('\n');
};
