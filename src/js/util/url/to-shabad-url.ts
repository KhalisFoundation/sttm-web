import { objectToQueryParams } from "../misc";
import { DEFAULT_SEARCH_RAAG, DEFAULT_SEARCH_WRITER } from '@/constants';
interface IToShabadUrlArguments {
  shabad: {
    shabadId: string | number,
    verseId: string
  },
  q: string,
  raag?: number,
  writer?: number,
  type?: string,
  source?: string
}

export const toShabadURL = ({
  shabad: { shabadId: id, verseId: highlight },
  q,
  raag = DEFAULT_SEARCH_RAAG,
  writer = DEFAULT_SEARCH_WRITER,
  type = undefined,
  source = undefined,
}: IToShabadUrlArguments) =>
  `/shabad?${objectToQueryParams({
    id,
    q,
    type,
    raag,
    writer,
    source,
    highlight,
  })}`;
