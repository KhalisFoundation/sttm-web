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
  autoDetectGurmukhi?: boolean;
}

export const toSearchURL = ({
  query: q,
  type = DEFAULT_SEARCH_TYPE,
  source = DEFAULT_SEARCH_SOURCE,
  writer = DEFAULT_SEARCH_WRITER,
  offset = '',
  autoDetectGurmukhi,
}: IToSearchURLArguments) => {
  const params: Record<string, string | number> = {
    q: encodeURIComponent(q),
    type,
    source,
    writer,
    offset,
  };

  // Add autoDetectGurmukhi parameter if it's defined and true
  if (autoDetectGurmukhi) {
    params.autoDetectGurmukhi = 'true';
  }

  return `/search?${objectToQueryParams(params)}`;
};
