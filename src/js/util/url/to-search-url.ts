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
  isGurmukhi,
}: IToSearchURLArguments) => {
  const params: Record<string, string | number> = {
    q: encodeURIComponent(q),
    type,
    source,
    writer,
    offset,
  };

  // Convert boolean autoDetectGurmukhi to string 'true'/'false' for URL params
  // (URL query parameters are always strings, not booleans)
  if (isGurmukhi !== undefined) {
    params.autoDetectGurmukhi = isGurmukhi ? 'true' : 'false';
  } else if (autoDetectGurmukhi) {
    params.autoDetectGurmukhi = 'true';
  }

  return `/search?${objectToQueryParams(params)}`;
};
