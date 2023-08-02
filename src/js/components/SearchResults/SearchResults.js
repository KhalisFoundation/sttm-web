import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

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

    const searchResultsClassName = cx({
      'search-results-display': true,
      'english-translation-search': type === SEARCH_TYPES.ENGLISH_WORD,
      'main-letter-search': type === SEARCH_TYPES.MAIN_LETTERS
    });


    const warning = type === SEARCH_TYPES['ASK_A_QUESTION'] && (
      <div className='warning-box'>
        <h4>⚠ This is an experimental feature.</h4>
        <p>If you come across any bug or conflict in the search results,
          <a href="https://support.khalisfoundation.org/support/tickets/new" target="blank">
            <u>let us know.</u>
          </a>
        </p>
      </div>
    );

    return (
      <>
        {warning}
        <ul className={searchResultsClassName}>
          {
            shabads.map(shabad => {
              return (
                <SearchResult
                  key={getVerseId(shabad)}
                  type={type}
                  shabad={shabad}
                  {...props} />
              );
            })
          }
        </ul>
      </>
    );
  }
}
