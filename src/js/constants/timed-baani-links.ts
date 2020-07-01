import { ACTIONS } from "../util/analytics";

export interface IBAANI_LINK {
  name: string;
  startTimeInMinutes: number;
  endTimeInMinutes: number;
  link: string;
  action: string;
}

export const TIMED_BAANI_LINKS: IBAANI_LINK[] = [{
  name: 'Rehraas sahib',
  startTimeInMinutes: 1020, // timeMath.calcTimeInMinutes(17, 0),
  endTimeInMinutes: 1200, // timeMath.calcTimeInMinutes(20, 0),
  link: '/sundar-gutka/21',
  action: ACTIONS.REHRAAS_SAHIB_LINK,
},
{
  name: 'Japji sahib',
  startTimeInMinutes: 300, // timeMath.calcTimeInMinutes(5, 0),
  endTimeInMinutes: 480, // timeMath.calcTimeInMinutes(8, 0),
  link: '/sundar-gutka/2',
  action: ACTIONS.JAPJI_SAHIB_LINK
},
{
  name: 'Sohilaa sahib',
  startTimeInMinutes: 1260, //timeMath.calcTimeInMinutes(21, 0),
  endTimeInMinutes: 1380, //timeMath.calcTimeInMinutes(23, 0),
  link: '/sundar-gutka/23',
  action: ACTIONS.SOHILAA_SAHIB_LINK
}];