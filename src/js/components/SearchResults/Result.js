import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Larivaar from '../../components/Larivaar';
import { toShabadURL, getHighlightIndices } from '../../util';
import {
  getAng,
  getSource,
  getUnicodeVerse,
  getGurmukhiVerse,
  translationMap,
  transliterationMap,
  getRaag,
  getWriter,
} from '@/util/api/shabad';

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

    const _source = getSource(shabad);
    const shabadPageNo = getAng(shabad) === null ? '' : getAng(shabad);
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
                  {getUnicodeVerse(shabad)}
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
                    {getGurmukhiVerse(shabad)}
                  </Larivaar>
                </div>
              )}
          </Link>

          <div className="clear" />

          {transliterationLanguages.includes('english') && (
            <p className="transliteration english">
              {transliterationMap['english'](shabad)}
            </p>
          )}

          {transliterationLanguages.includes('hindi') && (
            <p className="transliteration hindi">
              {transliterationMap['hindi'](shabad)}
            </p>
          )}

          {transliterationLanguages.includes('shahmukhi') && (
            <p className="transliteration shahmukhi">
              {transliterationMap['shahmukhi'](shabad)}
            </p>
          )}

          {transliterationLanguages.includes('IPA') && (
            <p className="transliteration IPA">
              {transliterationMap['IPA'](shabad)}
            </p>
          )}

          {translationLanguages.includes('punjabi') && (
            <blockquote className="translation punjabi gurbani-font">
              {unicode ? (
                <div className="unicode">
                  {translationMap['punjabi'](shabad).unicode}
                </div>
              ) : (
                  <div className="gurlipi">
                    {translationMap['punjabi'](shabad).gurmukhi}
                  </div>
                )}
            </blockquote>
          )}

          {translationLanguages.includes('english') && (
            <blockquote className="translation english">
              {translationMap['english'](shabad)}
            </blockquote>
          )}

          {translationLanguages.includes('spanish') && (
            <blockquote className="translation spanish">
              {translationMap['spanish'](shabad)}
            </blockquote>
          )}

          <div className="meta flex wrap">
            {presentationalSource && <a href="#">{presentationalSource}</a>}

            <a href="#">{getWriter(shabad)['english']}</a>

            {getRaag(shabad)['english'] === 'No Raag' ||
              getRaag(shabad)['english'] === null ? (
                ''
              ) : (
                <a href="#">{getRaag(shabad)['english']}</a>
              )}
          </div>
        </li>
      </React.Fragment>
    );
  }
}
