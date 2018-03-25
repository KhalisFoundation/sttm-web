import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { SOURCES } from 'shabados';
import { connect } from 'react-redux';
import { TEXTS } from '../../constants';
import Controls from '../../components/Controls';
import Larivaar from '../../components/Larivaar';

function getShabadHyperLink({ shabad, q, type, source }) {
  return (
    '/shabad?' +
    [
      `id=${shabad.shabadid}`,
      `q=${q}`,
      `${type ? `&type=${type}` : ''}`,
      `${source ? `&source=${source}` : ''}`,
      `highlight=${shabad.id}`,
    ].join('&')
  );
}

export function Stub() {
  return <div className="spinner" />;
}

class Layout extends React.PureComponent {
  static propTypes = {
    q: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    resultsCount: PropTypes.number.isRequired,
    nextPageOffset: PropTypes.number,
    offset: PropTypes.number,
    shabads: PropTypes.array.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
  };
  render() {
    const {
      q,
      type,
      offset,
      source,
      resultsCount,
      nextPageOffset,
      shabads,
      translationLanguages = [],
      transliterationLanguages = [],
      larivaarAssist,
      larivaar,
      unicode,
      fontSize,
    } = this.props;

    if (parseInt(resultsCount, 10) === 0) {
      return (
        <div className="text-center row" id="content-root">
          <h1>{TEXTS.NO_RESULTS_FOUND}</h1>
        </div>
      );
    }

    // I'm feeling lucky
    if (parseInt(resultsCount, 10) === 1) {
      const [{ shabad }] = shabads;
      return <Redirect to={getShabadHyperLink({ shabad, q, type, source })} />;
    }

    return (
      <div className="row" id="content-root">
        <Controls disableSplitView />
        <ul className="search-results display">
          {shabads.map(({ shabad }) => {
            const _source = SOURCES[shabad.source.id];
            const shabadPageNo = shabad.pageno === null ? '' : shabad.pageno;
            const presentationalSource = _source
              ? `${_source} - ${shabadPageNo}`
              : null;

            return (
              <React.Fragment key={shabad.id}>
                <li className="search-result">
                  <Link
                    style={{ fontSize: `${fontSize}em` }}
                    to={getShabadHyperLink({ shabad, q, type, source })}
                    className="gurbani-font gurbani-display"
                  >
                    {unicode ? (
                      <div className="unicode">
                        <Larivaar
                          larivaarAssist={larivaarAssist}
                          enable={larivaar}
                        >
                          {shabad.gurbani.unicode}
                        </Larivaar>
                      </div>
                    ) : (
                      <div className="gurlipi">
                        <Larivaar
                          larivaarAssist={larivaarAssist}
                          enable={larivaar}
                        >
                          {shabad.gurbani.gurmukhi}
                        </Larivaar>
                      </div>
                    )}
                  </Link>

                  <div className="clear" />

                  {transliterationLanguages.includes('english') && (
                    <p className="transliteration english">
                      {shabad.transliteration}
                    </p>
                  )}

                  {translationLanguages.includes('punjabi') && (
                    <blockquote className="translation punjabi gurbani-font">
                      {unicode ? (
                        <div className="unicode">
                          {shabad.translation.punjabi.bms.unicode}
                        </div>
                      ) : (
                        <div className="gurlipi">
                          {shabad.translation.punjabi.bms.gurmukhi}
                        </div>
                      )}
                    </blockquote>
                  )}

                  {translationLanguages.includes('english') && (
                    <blockquote className="translation english">
                      {shabad.translation.english.ssk}
                    </blockquote>
                  )}

                  {translationLanguages.includes('spanish') && (
                    <blockquote className="translation spanish">
                      {shabad.translation.spanish}
                    </blockquote>
                  )}

                  <div className="meta flex wrap">
                    {presentationalSource && (
                      <a href="#">{presentationalSource}</a>
                    )}

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
          })}
          <li className="load-more">
            {offset > 0 && (
              <Link
                className="load button"
                to={`/search?q=${q}&source=${source}&type=${type}&offset=${offset -
                  1}`}
              >
                {TEXTS.PREVIOUS_PAGE}
              </Link>
            )}
            {nextPageOffset && (
              <Link
                className="load button"
                to={`/search?q=${q}&source=${source}&type=${type}&offset=${nextPageOffset}`}
              >
                {TEXTS.NEXT_PAGE}
              </Link>
            )}
          </li>
        </ul>
      </div>
    );
  }
}

const stateToProps = state => state;
export default connect(stateToProps)(Layout);
