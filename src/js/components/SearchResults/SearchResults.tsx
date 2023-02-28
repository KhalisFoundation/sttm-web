import React from 'react';
import cx from 'classnames';

import SearchResult from './Result';
import { SEARCH_TYPES, SOURCES } from '@/constants';
import { getVerseId } from '@/util/api/shabad';
import { IShabad } from '@/types';

type Source = keyof typeof SOURCES;

interface Props {
  shabads: IShabad[],
  q: string,
  type: number,
  source: Source,
  translationLanguages: string[],
  transliterationLanguages: string[],
  larivaarAssist: boolean,
  larivaar: boolean,
  unicode: boolean,
  fontSize: number,
  fontFamily: string,
}

export const SearchResults = (props: Props) => {
  
    const { shabads, type, ...rest } = props;

    const searchResultsClassName = cx({
      'search-results-display': true,
      'english-translation-search': type === SEARCH_TYPES.ENGLISH_WORD,
      'main-letter-search': type === SEARCH_TYPES.MAIN_LETTERS
    });

    return (
      <ul className={searchResultsClassName}>
        {
          shabads.map(shabad => {
            return (
              <SearchResult
                key={getVerseId(shabad)}
                type={type}
                shabad={shabad}
                {...rest} />
            );  
          })
        }
      </ul>
    );
  }

