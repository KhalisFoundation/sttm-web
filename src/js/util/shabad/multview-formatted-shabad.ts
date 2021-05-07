import { IMultipleShabadsProps } from '@/types/multiple-shabads';
import { getShabadId, getUnicodeVerse, getVerseId } from '../api';

export const multiviewFormattedShabad = (shabad: IMultipleShabadsProps) => ({
  verseId: getVerseId(shabad),
  shabadId: getShabadId(shabad),
  verse: getUnicodeVerse(shabad),
  url: `shabad?id=${getShabadId(shabad)}&highlight=${getVerseId(shabad)}`
})