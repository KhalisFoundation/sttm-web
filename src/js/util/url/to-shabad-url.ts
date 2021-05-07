import { objectToQueryParams } from "../misc";
interface IToShabadUrlArguments {
  shabad: {
    shabadId: string | number,
    verseId: string
  },
  q: string,
  type?: string,
  source?: string
}

export const toShabadURL = ({
  shabad: { shabadId: id, verseId: highlight },
  q,
  type = undefined,
  source = undefined,
}: IToShabadUrlArguments): string =>
  `/shabad?${objectToQueryParams({
    id,
    q,
    type,
    source,
    highlight,
  })}`;
