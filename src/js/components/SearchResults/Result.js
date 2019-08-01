import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SOURCES } from '../../constants';

import Larivaar from '../../components/Larivaar';
import { toShabadURL, getHighlightIndices } from '../../util';

export default class SearchResult extends React.PureComponent {
  static propTypes = {
    shabad: PropTypes.object.isRequired,
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
    const {
      transliterationLanguages,
      translationLanguages,
      shabad,
      fontSize,
      fontFamily,
      q,
      type,
      source,
      unicode,
      larivaar,
      larivaarAssist,
    } = this.props;

    const _source = SOURCES[shabad.source.sourceId];
    const shabadPageNo = shabad.pageno === null ? '' : shabad.pageno;
    const presentationalSource = _source
      ? `${_source} - ${shabadPageNo}`
      : null;

    const [highlightStartIndex, higlightEndIndex] = getHighlightIndices(
      shabad.verse.gurmukhi,
      q,
      type
    );

    return (
      <React.Fragment key={shabad.id}>
        <li className="search-result">
          <Link
            style={{ fontSize: `${fontSize}em`, fontFamily: `${fontFamily}` }}
            to={toShabadURL({ shabad, q, type, source })}
            className="gurbani-font gurbani-display"
          >
            {unicode ? (
              <div className={`unicode ${larivaar ? 'larivaar' : ''}`}>
                <Larivaar
                  larivaarAssist={larivaarAssist}
                  enable={larivaar}
                  unicode={unicode}
                  startIndex={highlightStartIndex}
                  endIndex={higlightEndIndex}
                  query={q}
                >
                  {shabad.verse.unicode}
                </Larivaar>
              </div>
            ) : (
              <div className={`gurlipi ${larivaar ? 'larivaar' : ''}`}>
                <Larivaar
                  larivaarAssist={larivaarAssist}
                  enable={larivaar}
                  startIndex={highlightStartIndex}
                  endIndex={higlightEndIndex}
                  query={q}
                >
                  {shabad.verse.gurmukhi}
                </Larivaar>
              </div>
            )}
          </Link>

          <div className="clear" />

          {transliterationLanguages.includes('english') && (
            <p className="transliteration english">
              {shabad.transliteration.english}
            </p>
          )}

          {translationLanguages.includes('punjabi') && (
            <blockquote className="translation punjabi gurbani-font">
              {unicode ? (
                <div className="unicode">
                  {shabad.translation.pu.ss.unicode}
                </div>
              ) : (
                <div className="gurlipi">
                  {shabad.translation.pu.ss.gurmukhi}
                </div>
              )}
            </blockquote>
          )}

          {translationLanguages.includes('english') && (
            <blockquote className="translation english">
              {shabad.translation.en.bdb}
            </blockquote>
          )}

          {translationLanguages.includes('spanish') && (
            <blockquote className="translation spanish">
              {shabad.translation.es.sn}
            </blockquote>
          )}

          <div className="meta flex wrap">
            {presentationalSource && <a href="#">{presentationalSource}</a>}

            <a href="#">{shabad.writer.english}</a>

            {shabad.raag.english === 'No Raag' ||
            shabad.raag.english === null ? (
              ''
            ) : (
              <a href="#">{shabad.raag.english}</a>
            )}
          </div>
        </li>
      </React.Fragment>
    );
  }
}
