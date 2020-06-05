import { dateMath } from '../';
import {
  FIRST_HUKAMNAMA_DATE,
} from '../../constants';

export const getHukamnama = (data: { shabads?: any; date?: any; }) => {
  const { shabads } = data;
  const { date, month, year } = data.date.gregorian;
  const hukamnamaDate = year + '/' + month + '/' + date;
  let totalVerses: any[] | never[] = [];

  shabads.forEach((s: { verses: ConcatArray<never>; }) => {
    totalVerses = totalVerses.concat(s.verses);
  });
  const [shabad] = shabads;
  shabad.verses = totalVerses;
  shabad.expandedDate = dateMath.expand(hukamnamaDate);

  let prevDate = dateMath.algebra(hukamnamaDate, '-', 1);

  if (dateMath.isBefore(prevDate, FIRST_HUKAMNAMA_DATE)) {
    prevDate = '';
  }

  //TODO: After API is updated, check if it's latest hukamnama from API

  let nextDate = dateMath.algebra(hukamnamaDate, '+', 1);

  if (dateMath.isFuture(nextDate)) {
    nextDate = '';
  }

  shabad.nav = {
    previous: prevDate === '' ? undefined : prevDate,
    next: nextDate === '' ? undefined : nextDate,
  };
  return shabad;
};
