import { SOURCES } from '../../constants';

export const getAng = shabad => shabad.pageNo;

export const getSource = shabad => SOURCES[shabad.source.sourceId];

export const getSourceId = shabad => shabad.source.sourceId;

export const getUnicodeVerse = shabad => shabad.verse.unicode;

export const getGurmukhiVerse = shabad => shabad.verse.gurmukhi;

export const translationMap = {
  spanish: shabad => shabad.translation.es.sn,
  english: shabad => shabad.translation.en.bdb,
  punjabi: shabad => ({
    ...shabad.translation.pu.ss,
    toString: () => shabad.translation.pu.ss.unicode,
  }),
};

export const transliterationMap = {
  english: shabad => shabad.transliteration.english,
};

export const getRaag = {
  english: shabad => shabad.raag.english,
  gurmukhi: shabad => shabad.raag.gurmukhi,
  unicode: shabad => shabad.raag.unicode,
};

export const getWriter = {
  english: shabad => shabad.writer.english,
  gurmukhi: shabad => shabad.writer.gurmukhi,
  unicode: shabad => shabad.writer.unicode,
};
