import { objectToQueryParams } from "..";

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
