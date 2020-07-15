import {
  DEFAULT_SEARCH_TYPE,
  DEFAULT_SEARCH_SOURCE,
  DEFAULT_SEARCH_RAAG,
  DEFAULT_SEARCH_WRITER,
} from '../../constants';

import { objectToQueryParams } from '../misc';
interface IToSearchURLArguments {
  query: string,
  type: number,
  raag: number,
  writer: number,
  source: string,
  offset: string
}

export const toSearchURL = ({
  query: q,
  type = DEFAULT_SEARCH_TYPE,
  source = DEFAULT_SEARCH_SOURCE,
  raag = DEFAULT_SEARCH_RAAG,
  writer = DEFAULT_SEARCH_WRITER,
  offset = '',
}: IToSearchURLArguments) => {
  debugger;
  const searchUrl = `/search?${objectToQueryParams({
    q: encodeURIComponent(q),
    type,
    raag,
    writer,
    source,
    offset,
  })}`;
  console.log(searchUrl, 'SEARCH URL');
  return searchUrl;
}