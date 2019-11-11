import { SOURCES } from '../../constants';

export const getAng = shabad => shabad.pageNo;

export const getSource = shabad => SOURCES[shabad.source.sourceId];

export const getSourceId = shabad => shabad.source.sourceId;

export const getUnicodeVerse = shabad => shabad.verse.unicode;

export const getGurmukhiVerse = shabad => shabad.verse.gurmukhi;

export const getVerseId = shabad => shabad.verseId;

export const getShabadId = shabad => shabad.shabadId;

export const translationMap = {
  spanish: shabad => shabad.translation.es.sn,
  english: shabad => shabad.translation.en.bdb,
  punjabi: shabad => ({
    ...shabad.translation.pu.ss,
    toString: () => shabad.translation.pu.ss.unicode,
  }),
};

export const transliterationMap = {
  english: shabad => shabad.transliteration.en,
  hindi: shabad => shabad.transliteration.hi,
  shahmukhi: shabad => shabad.transliteration.ur,
  IPA: shabad => shabad.transliteration.ipa,
};

export const getRaag = (shabad) => ({
  english: shabad.raag ? shabad.raag.english : '',
  gurmukhi: shabad.raag ? shabad.raag.gurmukhi : '',
  unicode: shabad.raag ? shabad.raag.unicode : '',
});

export const getWriter = (shabad) => ({
  english: shabad.writer ? shabad.writer.english : '',
  gurmukhi: shabad.writer ? shabad.writer.gurmukhi : '',
  unicode: shabad.writer ? shabad.writer.unicode : '',
});
