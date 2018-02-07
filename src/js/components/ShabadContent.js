import React from 'react';
import Larivaar from './Larivaar';
import Controls from './Controls';
import { connect } from 'react-redux';
import { replaceState } from '../util';

// TODO: Make it actually work
const FootNav = ({ link, nav = {} }) => (
  <div className="pagination">
    {nav.previous && (
      <div className="shabad-nav left">
        <a href={link + nav.previous}>
          <i className="fa fa-chevron-left" aria-hidden="true" />
          <span>Previous</span>
        </a>
      </div>
    )}
    {nav.next && (
      <div className="shabad-nav right">
        <a href={link + nav.next}>
          <span>Next</span>
          <i className="fa fa-chevron-right" aria-hidden="true" />
        </a>
      </div>
    )}
  </div>
);


// TODO: Make it actually work
const Meta = ({ nav = {}, type, info }) => {
  const link = navLink(type, info.source.id);
  const Item = ({ children, last = false }) => children
    ? <React.Fragment>{children}{last ? '' : ' - '}</React.Fragment>
    : null;
  return (
    <div id="metadata">
      <div className="shabad-nav left">
        <a href={link + nav.previous}>
          <i className="fa fa-chevron-left" aria-hidden="true" />
        </a>
      </div>
      <div className="meta">
        <h4 className="gurbani-font">
          <Item>
            {info.raag && info.raag.gurmukhi && info.raag.gurmukhi !== 'null' && info.raag.gurmukhi}
          </Item>
          <Item>{info.writer && info.writer.gurmukhi}</Item>
          <Item>{info.source.gurmukhi}</Item>
          <Item last>{info.pageno !== null && (
            <a href={`/ang?ang=${info.source.pageno}&source=${info.source.id}`}>
              {info.source.id == 'G' ? 'AMg' : 'pMnw'} {info.source.pageno}
            </a>
          )}
          </Item>
        </h4>
        <h4>
          <Item>{info.raag && info.raag.english && info.raag.english !== 'null' && info.raag.english}</Item>
          <Item>{info.writer && info.writer.english}</Item>
          <Item>{info.source.english}</Item>
          <Item last>{info.pageno !== null && (
            <a href={`/ang?ang=${info.source.pageno}&source=${info.source.id}`}>
              {info.source.id == 'G' ? 'Ang' : 'Pannaa'} {info.source.pageno}
            </a>
          )}
          </Item>
        </h4>
      </div >

      <div className="shabad-nav right">
        <a href={link + nav.next}>
          <i className="fa fa-chevron-right" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

function Shabad({
  gurbani,
  nav,
  info,
  type,
  random,
  splitView,
  translationLanguages,
  transliterationLanguages,
  larivaarAssist,
  larivaar,
  unicode,
  fontSize,
}) {
  if (typeof random !== 'undefined') {
    replaceState(`/shabad?id=${info.id}`);
  }

  return (
    <React.Fragment>
      <Controls />
      <Meta info={info} nav={nav} type={type} />
      <div id="shabad" className="shabad">
        <div className="shabad-container">
          <Baani
            gurbani={gurbani}
            splitView={splitView}
            unicode={unicode}
            larivaar={larivaar}
            fontSize={fontSize}
            larivaarAssist={larivaarAssist}
            translationLanguages={translationLanguages}
            transliterationLanguages={transliterationLanguages}
          />
          <FootNav />
        </div>
      </div>
    </React.Fragment>
  );
}

function navLink(type, source) {
  switch (type) {
    case 'shabad': return 'shabad?id=';
    case 'ang': return `ang?source=${source}&ang=`;
  }
}

const BaaniLine = ({ larivaar, larivaarAssist, fontSize, unicode, text }) => (
  <div className="gurmukhi gurbani-display gurbani-font" style={{ fontSize: `${fontSize}em` }}>
    <div className={unicode ? 'unicode' : 'gurlipi'}>
      <Larivaar larivaarAssist={larivaarAssist} enable={larivaar}>
        {unicode ? text.unicode : text.gurmukhi}
      </Larivaar>
    </div>
  </div>
);

const EnglishTransliteration = ({ transliteration }) => (
  <p className="transliteration english">{transliteration}</p>
);
const SpanishTranslation = ({ translation }) => (
  <blockquote className="translation spanish">{translation}</blockquote>
);
const EnglishTranslation = ({ translation }) => (
  <blockquote className="translation english">{translation}</blockquote>
);
const PunjabiTranslation = ({ unicode, text }) => (
  <blockquote className="translation punjabi gurbani-font">
    {
      unicode
        ? <div className="unicode">{text.unicode}</div>
        : <div className="gurlipi">{text.gurmukhi}</div>
    }
  </blockquote>
);

function Baani({
  gurbani,
  splitView,
  translationLanguages,
  transliterationLanguages,
  larivaarAssist,
  larivaar,
  unicode,
  fontSize,
}) {
  const _getShabadLine = el => [...el.parentNode.parentNode.querySelectorAll('div, blockquote')]
    .filter(e => getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none') // filter hidden ones
    .map(child => (child.querySelector('div.unicode') || child).innerText) // get innerText
    .filter(text => text) // filter empty strings
    .join('\n'); // join them by new line

  const onCopyClick = ({ currentTarget }) => copyToClipboard(_getShabadLine(currentTarget))
    .then(() => showToast('Gurbaani has been copied!'))
    .catch(() => showToast('Sorry, we couldn\'t copy the link.'));

  const onTweetClick = ({ currentTarget }) => {
    let tweet = _getShabadLine(currentTarget);
    const shortURL = `\n${shortenURL()}`;
    if (tweet.length + shortURL.length > 274) {
      tweet = `${tweet.substring(0, 272 - shortURL.length)}…`;
    }
    tweet += shortURL;
    tweet += ' #sttm';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank');
  };

  const mixedViewMarkup = (
    <div className="mixed-view-baani">
      {
        gurbani.map(({ shabad }) => (
          <div key={shabad.id} id={`line-${shabad.id}`} className="line">
            <BaaniLine
              text={shabad.gurbani}
              unicode={unicode}
              larivaar={larivaar}
              larivaarAssist={larivaarAssist}
              fontSize={fontSize}
            />
            {transliterationLanguages.includes('english') && <EnglishTransliteration transliteration={shabad.transliteration} />}
            {translationLanguages.includes('punjabi') && <PunjabiTranslation translation={shabad.translation.punjabi.bms} />}
            {translationLanguages.includes('english') && <EnglishTranslation translation={shabad.translation.english.ssk} />}
            {translationLanguages.includes('spanish') && <SpanishTranslation translation={shabad.translation.spanish} />}

            <div className="share">
              <a className="copy" onClick={onCopyClick}><i className="fa fa-fw fa-clipboard" /></a>
              <a className="twitter" onClick={onTweetClick}><i className="fa fa-fw fa-twitter" /></a>
              {/* <a className="facebook"><i className="fa fa-fw fa-facebook" /></a> */}
            </div>
          </div>
        ))
      }
    </div>
  );

  const splitViewMarkup = (
    <div className="split-view-baani">
      <div className="split-view-baani-wrapper">
        {gurbani.map(({ shabad }) => (
          <div key={shabad.id} className="line">
            <BaaniLine
              text={shabad.gurbani}
              unicode={unicode}
              larivaar={larivaar}
              larivaarAssist={larivaarAssist}
              fontSize={fontSize}
            />
            <div className="share">
              <a className="copy"><i className="fa fa-fw fa-clipboard" /></a>
              <a className="twitter"><i className="fa fa-fw fa-twitter" /></a>
              {/* <a className="facebook"><i className="fa fa-fw fa-facebook" /></a> */}
            </div>
          </div>
        ))}
      </div>
      {transliterationLanguages.includes('english') && (
        <div className="split-view-baani-wrapper">
          {gurbani.map(({ shabad }) => <EnglishTransliteration key={shabad.id} transliteration={shabad.transliteration} />)}
        </div>
      )}
      {translationLanguages.includes('punjabi') && (
        <div className="split-view-baani-wrapper">
          {gurbani.map(({ shabad }) => <PunjabiTranslation key={shabad.id} translation={shabad.translation.punjabi.bms} />)}
        </div>
      )}
      {translationLanguages.includes('english') && (
        <div className="split-view-baani-wrapper">
          {gurbani.map(({ shabad }) => <EnglishTranslation key={shabad.id} translation={shabad.translation.english.ssk} />)}
        </div>
      )}
      {translationLanguages.includes('spanish') && (
        <div className="split-view-baani-wrapper">
          {gurbani.map(({ shabad }) => <SpanishTranslation key={shabad.id} translation={shabad.translation.spanish} />)}
        </div>
      )}
    </div>
  );

  return (
    <div className="shabad-content">
      {
        splitView
          ? splitViewMarkup
          : mixedViewMarkup
      }
    </div>
  );
}

const stateToProps = state => state;
export default connect(stateToProps)(Shabad);
