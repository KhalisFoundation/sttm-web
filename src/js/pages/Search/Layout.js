import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { SOURCES } from 'shabados';
import { connect } from 'react-redux';
import Controls from '../../components/Controls';
import Larivaar from '../../components/Larivaar';

function getShabadHyperLink({ shabad, q, type, source }) {
  return `/shabad?id=${shabad.shabadid}&q=${q}${type ? `&type=${type}` : ''}${source ? `&source=${source}` : ''}`;
}

export function Stub() {
  return <div className="spinner" />;
}

class Layout extends React.PureComponent {
  static propTypes = {
      q: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      resultsCount: PropTypes.number.isRequired,
      nextPageOffset: PropTypes.number,
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
      return <h3>No results found</h3>;
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
            const shabadPageNo = (shabad.pageno === null) ? '' : shabad.pageno;
            const presentationalSource = _source ? `${_source} - ${shabadPageNo}` : null;

            return (
              <React.Fragment key={shabad.id}>
                <li className='search-result'>
                  <a style={{ fontSize: `${fontSize}em` }} href={getShabadHyperLink({ shabad, q, type, source })} className='gurbani-font gurbani-display'>
                    {
                      unicode
                        ? <div className='unicode'><Larivaar larivaarAssist={larivaarAssist} enable={larivaar}>{shabad.gurbani.unicode}</Larivaar></div>
                        : <div className='gurlipi'><Larivaar larivaarAssist={larivaarAssist} enable={larivaar}>{shabad.gurbani.gurmukhi}</Larivaar></div>
                    }
                  </a>

                  <div className='clear' />

                  {transliterationLanguages.includes('english') && <p className='transliteration english'>{shabad.transliteration}</p>}

                  {translationLanguages.includes('punjabi') && (
                    <blockquote className='translation punjabi gurbani-font'>
                      {
                        unicode
                          ? <div className='unicode'>{shabad.translation.punjabi.bms.unicode}</div>
                          : <div className='gurlipi'>{shabad.translation.punjabi.bms.gurmukhi}</div>
                      }
                    </blockquote>
                  )}

                  {translationLanguages.includes('english') && <blockquote className='translation english'>{shabad.translation.english.ssk}</blockquote>}

                  {translationLanguages.includes('spanish') && <blockquote className='translation spanish'>{shabad.translation.spanish}</blockquote>}

                  <div className='meta flex wrap'>
                    {presentationalSource && <a href='#'>{presentationalSource}</a>}

                    <a href='#'>{shabad.writer.english}</a>

                    {shabad.raag.english === 'No Raag' || shabad.raag.english === null
                      ? ''
                      : <a href='#'>{shabad.raag.english}</a>
                    }
                  </div>
                </li>
              </React.Fragment>
            );
          })}
          {
            nextPageOffset && (
              <li className='load-more'>
                <Link
                  className='load button'
                  to={`/search?q=${q}&source=${source}&type=${type}&offset=${nextPageOffset}`}
                >
                  Load More
                </Link>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

const stateToProps = state => state;
export default connect(stateToProps)(Layout);
