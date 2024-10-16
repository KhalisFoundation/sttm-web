import { SOURCES } from '@sttm/banidb';
import { IShabad } from '@/types/shabad'

interface ITransProps {
  [name: string]: (shabad: IShabad) => string | {}
}

export const getAng = (shabad: IShabad) => shabad.pageNo;

export const getSource = (shabad: IShabad) => SOURCES[shabad.source.sourceId];

export const getSourceId = (shabad: IShabad) => shabad.source.sourceId;

export const getUnicodeVerse = (shabad: IShabad) => shabad.verse.unicode;

export const getGurmukhiVerse = (shabad: IShabad) => shabad.verse.gurmukhi;

export const getVerseId = (shabad: IShabad) => shabad.verseId;

export const getShabadId = (shabad: IShabad) => {
  if (!shabad) return;
  return shabad.shabadId || shabad.ceremonyID || shabad.baniID;
}

export const transliterationMap: ITransProps = {
  english: shabad => shabad.transliteration.en,
  hindi: shabad => shabad.transliteration.hi,
  shahmukhi: shabad => shabad.transliteration.ur,
  IPA: shabad => shabad.transliteration.ipa,
};

export const translationMap: ITransProps = {
  spanish: shabad => shabad.translation.es.sn,
  english: shabad => shabad.translation.en.bdb,
  punjabi: shabad => ({
    ...shabad.translation.pu.bdb,
    toString: () => shabad.translation.pu.bdb.unicode,
  }),
  hindi: shabad => shabad.translation.hi.ss,
};

export const hindiTranslationMap: ITransProps = {
  'sahib singh': shabad => shabad.translation.hi.ss,
  'sant singh': shabad => shabad.translation.hi.sts,
};

export const englishTranslationMap: ITransProps = {
  'BaniDB': shabad => shabad.translation.en.bdb,
  'manmohan singh': shabad => shabad.translation.en.ms,
  'sant singh khalsa': shabad => shabad.translation.en.ssk,
};

export const steekMap: ITransProps = {
  'sahib singh': shabad => shabad.translation.pu.ss,
  fareedkot: shabad => shabad.translation.pu.ft,
  'BaniDB': shabad => shabad.translation.pu.bdb,
  'manmohan singh': shabad => shabad.translation.pu.ms,
};

export const getRaag = (shabad: IShabad) => ({
  english: shabad.raag ? shabad.raag.english : '',
  gurmukhi: shabad.raag ? shabad.raag.gurmukhi : '',
  unicode: shabad.raag ? shabad.raag.unicode : '',
});

export const getWriter = (shabad: IShabad) => ({
  english: shabad.writer ? shabad.writer.english : '',
  gurmukhi: shabad.writer ? shabad.writer.gurmukhi : '',
  unicode: shabad.writer ? shabad.writer.unicode : '',
});

export const getWriterId = (shabad: IShabad) => shabad.writer && shabad.writer.writerId;