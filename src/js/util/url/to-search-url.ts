import {
  DEFAULT_SEARCH_TYPE,
  DEFAULT_SEARCH_SOURCE,
  DEFAULT_SEARCH_WRITER,
} from '../../constants';

import { objectToQueryParams } from '../misc';
interface IToSearchURLArguments {
  query: string,
  type: number,
  source: string,
  writer: string,
  offset: string,
}

export const toSearchURL = ({
  query: q,
  type = DEFAULT_SEARCH_TYPE,
  source = DEFAULT_SEARCH_SOURCE,
  writer = DEFAULT_SEARCH_WRITER,
  offset = '',
}: IToSearchURLArguments) =>
  `/search?${objectToQueryParams({
    q: encodeURIComponent(q),
    type,
    source,
    writer,
    offset,
  })}`;
