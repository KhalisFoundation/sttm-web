import { objectToQueryParams } from '..';

/* globals API_URL */
import {
  DEFAULT_SEARCH_TYPE,
  DEFAULT_SEARCH_SOURCE,
} from '../../constants';

interface IToSearchURLArguments {
  query: string,
  type: number,
  source: string,
  offset: string
}


export const toSearchURL = ({
  query: q,
  type = DEFAULT_SEARCH_TYPE,
  source = DEFAULT_SEARCH_SOURCE,
  offset = '',
}: IToSearchURLArguments) =>
  `/search?${objectToQueryParams({
    q: encodeURIComponent(q),
    type,
    source,
    offset,
  })}`;
