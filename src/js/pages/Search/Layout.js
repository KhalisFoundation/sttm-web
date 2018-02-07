import React from 'react';
import { SOURCES } from 'shabados';
import { connect } from 'react-redux';
import { Controls, Larivaar } from '../../components';
import { redirectTo } from '../../util';

function getShabadHyperLink({ shabad, q, type, source }) {
  return `/shabad?id=${shabad.shabadid}&q=${q}${type ? `&type=${type}` : ''}${source ? `&source=${source}` : ''}`;
}

export function Stub() {
  return <div className="spinner" />;
}

function Layout({
  q,
  type,
  source,
  resultsCount,
  nextPageOffset,
  shabads,
  onLoadMore,
  splitView,
  translationLanguages = [],
  transliterationLanguages = [],
  larivaarAssist,
  larivaar,
  unicode,
  fontSize,
}) {
  if (parseInt(resultsCount, 10) === 0) {
    return <h3>No results found</h3>;
  }

  if (parseInt(resultsCount, 10) === 1) {
    const [{ shabad }] = shabads;
    redirectTo(getShabadHyperLink({ shabad, q, type, source }));
    return null;
  }

  return (
    <React.Fragment>
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
                      ? <div className='unicode'><Larivaar enable={larivaar}>{shabad.gurbani.unicode}</Larivaar></div>
                      : <div className='gurlipi'><Larivaar enable={larivaar}>{shabad.gurbani.gurmukhi}</Larivaar></div>
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
            <li className='load-more' onClick={() => onLoadMore(nextPageOffset)}>
              <a className='load button'>Load More</a>
            </li>
          )
        }
      </ul>
    </React.Fragment>
  );
}

const stateToProps = state => state;
export default connect(stateToProps)(Layout);
