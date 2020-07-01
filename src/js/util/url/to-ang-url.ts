import { objectToQueryParams } from "../misc";

interface IToAngURLArguments {
  ang: number,
  source: string,
  highlight: string | number
}

export const toAngURL = ({ ang, source, highlight }: IToAngURLArguments) =>
  `/ang?${objectToQueryParams({
    ang,
    source,
    highlight,
  })}`;
