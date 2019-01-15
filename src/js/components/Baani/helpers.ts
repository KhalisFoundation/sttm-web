import { IShabad } from '@/types';

export const transliterationMap = {
  english: (shabad: IShabad) => shabad.transliteration,
};

export const translationMap = {
  spanish: (shabad: IShabad) => shabad.translation.spanish,
  english: (shabad: IShabad) => shabad.translation.english.ssk,
  punjabi: (shabad: IShabad) => ({
    ...shabad.translation.punjabi.bms,
    toString: () => shabad.translation.punjabi.bms.unicode,
  }),
};
