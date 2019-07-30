import React from 'react';
import PropTypes from 'prop-types';

import SearchResult from './Result';

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
    const { shabads, ...props } = this.props;

    return (
      <ul className="search-results display">
        {shabads.map(shabad => {
          return (
            <SearchResult key={shabad.verseId} shabad={shabad} {...props} />
          );
        })}
      </ul>
    );
  }
}
