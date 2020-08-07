import React from 'react';
import PropTypes from 'prop-types';

import SearchResult from './Result';
import { SEARCH_TYPES } from '@/constants';
import { getVerseId } from '@/util/api/shabad';

export default class SearchResults extends React.PureComponent {
  static propTypes = {
    shabads: PropTypes.array.isRequired,
    q: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
  };

  render() {
    const { shabads, type, ...props } = this.props;
    const isSearchTypeEnglishWord = type === SEARCH_TYPES.ENGLISH_WORD;

    return (
      <ul className={`search-results display ${isSearchTypeEnglishWord ? 'english-translation-search' : ''}`}>
        {shabads.map(shabad => {
          return (
            <SearchResult
              key={getVerseId(shabad)}
              type={type}
              shabad={shabad}
              {...props} />
          );
        })}
      </ul>
    );
  }
}
