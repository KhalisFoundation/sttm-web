import {
  DEFAULT_SEARCH_TYPE,
  DEFAULT_SEARCH_SOURCE,
  DEFAULT_SEARCH_WRITER,
} from '../../constants';

import { objectToQueryParams } from '../misc';
interface IToSearchURLArguments {
  query: string;
  type: number;
  source: string;
  writer: string;
  offset: string;
  isGurmukhi?: boolean;
}

export const toSearchURL = ({
  query: q,
  type = DEFAULT_SEARCH_TYPE,
  source = DEFAULT_SEARCH_SOURCE,
  writer = DEFAULT_SEARCH_WRITER,
  offset = '',
  isGurmukhi,
}: IToSearchURLArguments) => {
  const params: Record<string, string | number> = {
    q: encodeURIComponent(q),
    type,
    source,
    writer,
    offset,
  };

  // Only add isGurmukhi parameter if it's defined and true
  if (isGurmukhi) {
    params.isGurmukhi = 1;
  }

  return `/search?${objectToQueryParams(params)}`;
};
