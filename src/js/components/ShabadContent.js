import React from 'react';
import PropTypes from 'prop-types';
import Larivaar from './Larivaar';
import Controls from './Controls';
import { connect } from 'react-redux';
import { copyToClipboard, showToast, shortenURL, replaceState } from '../util';
import { TRANSLATION_LANGUAGES } from '../constants';

class FootNav extends React.PureComponent {
  static propTypes = {
    info: PropTypes.object.isRequired,
    type: PropTypes.string,
    nav: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string,
    }),
  };

  render() {
    const { info, nav, type } = this.props;
    const link = navLink(type, info.source.id);
    return (
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
  }
}

class Meta extends React.PureComponent {
  static defaultProps = {
    nav: {}
  };

  static propTypes = {
    type: PropTypes.string.isRequired,
    info: PropTypes.object.isRequired,
    nav: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string,
    }),
  };

  render() {
    const { nav = {}, type, info } = this.props;
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
  }
}

class Shabad extends React.PureComponent {
  static defaultProps = {
    nav: {}
  };

  static propTypes = {
    gurbani: PropTypes.array.isRequired,
    random: PropTypes.bool.isRequired,
    splitView: PropTypes.bool.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    info: PropTypes.object.isRequired,
    nav: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string,
    }),
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
  };

  render() {
    const {
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
    } = this.props;

    if (random) {
      replaceState(`/shabad?id=${info.id}`);
      return null;
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
            <FootNav info={info} type={type} nav={nav} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function navLink(type, source) {
  switch (type) {
    case 'shabad': return 'shabad?id=';
    case 'ang': return `ang?source=${source}&ang=`;
  }
}

class BaaniLine extends React.PureComponent {
  static propTypes = {
    text: PropTypes.shape({
      unicode: PropTypes.string,
      gurmukhi: PropTypes.string,
    }).isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
  };

  render() {
    const { larivaar, larivaarAssist, fontSize, unicode, text } = this.props;
    return (
      <div className="gurmukhi gurbani-display gurbani-font" style={{ fontSize: `${fontSize}em` }}>
        <div className={unicode ? 'unicode' : 'gurlipi'}>
          <Larivaar larivaarAssist={larivaarAssist} enable={larivaar}>
            {unicode ? text.unicode : text.gurmukhi}
          </Larivaar>
        </div>
      </div>
    );
  }
}

class EnglishTransliteration extends React.PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
  };

  render() {
    return (
      <p className="transliteration english">{this.props.children}</p>
    );
  }
}

class Translation extends React.PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(TRANSLATION_LANGUAGES),
    unicode: (props, propName) => {
      if (props.type === 'punjabi' && (
        props[propName] === undefined
        || typeof props[propName] !== 'boolean'
      )) {
        return new Error(`${propName} is required when props.type = 'punjabi'`);
      }
    },
    text: (props, propName) => {
      if (props.type === 'punjabi' && (
        props[propName] === undefined
        || !('gurmukhi' in props[propName])
        || !('unicode' in props[propName])
        || typeof props[propName].gurmukhi !== 'string'
        || typeof props[propName].unicode !== 'string'
      )) {
        return new Error(`${propName} is required when props.type = 'punjabi' of shape { gurmukhi: String, unicode: String }`);
      }
    },
    children: PropTypes.string.isRequired,
  };

  render() {
    const {
      type,
      unicode,
      text
    } = this.props;

    const PUNJABI = 'punjabi';
    const className = `transliteration ${type} ${type === PUNJABI ? 'gurbani-font' : ''}`;
    return type === PUNJABI
      ? (

        <blockquote className="translation punjabi gurbani-font">
          {
            unicode
              ? <div className="unicode">{text.unicode}</div>
              : <div className="gurlipi">{text.gurmukhi}</div>
          }
        </blockquote>
      )
      : (
        <blockquote className={className}>{this.props.children}</blockquote>
      );
  }
}

class Baani extends React.PureComponent {
  static propTypes = {
    gurbani: PropTypes.array.isRequired,
    splitView: PropTypes.bool.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
  };

  _getShabadLine = el => [...el.parentNode.parentNode.querySelectorAll('div, blockquote')]
    .filter(e => getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none') // filter hidden ones
    .map(child => (child.querySelector('div.unicode') || child).innerText) // get innerText
    .filter(text => text) // filter empty strings
    .join('\n'); // join them by new line

  onCopyClick = ({ currentTarget }) => copyToClipboard(this._getShabadLine(currentTarget))
    .then(() => showToast('Gurbaani has been copied!'))
    .catch(() => showToast('Sorry, we couldn\'t copy the link.'));

  onTweetClick = ({ currentTarget }) => {
    let tweet = this._getShabadLine(currentTarget);
    const shortURL = `\n${shortenURL()}`;
    if (tweet.length + shortURL.length > 274) {
      tweet = `${tweet.substring(0, 272 - shortURL.length)}…`;
    }
    tweet += shortURL;
    tweet += ' #sttm';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank');
  };

  render() {
    const {
      gurbani,
      splitView,
      translationLanguages,
      transliterationLanguages,
      larivaarAssist,
      larivaar,
      unicode,
      fontSize,
    } = this.props;

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
              {transliterationLanguages.includes('english') && <EnglishTransliteration>{shabad.transliteration}</EnglishTransliteration>}
              {translationLanguages.includes('punjabi') && <Translation type="punjabi" unicode={unicode} text={shabad.translation.punjabi.bms} />}
              {translationLanguages.includes('english') && <Translation type="english">{shabad.translation.english.ssk}</Translation>}
              {translationLanguages.includes('spanish') && <Translation type="spanish">{shabad.translation.spanish}</Translation>}

              <div className="share">
                <a className="copy" onClick={this.onCopyClick}><i className="fa fa-fw fa-clipboard" /></a>
                <a className="twitter" onClick={this.onTweetClick}><i className="fa fa-fw fa-twitter" /></a>
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
            {gurbani.map(({ shabad }) => <EnglishTransliteration key={shabad.id}>{shabad.transliteration}</EnglishTransliteration>)}
          </div>
        )}
        {translationLanguages.includes('punjabi') && (
          <div className="split-view-baani-wrapper">
            {gurbani.map(({ shabad }) => <Translation type="punjabi" key={shabad.id} unicode={unicode} text={shabad.translation.punjabi.bms} />)}
          </div>
        )}
        {translationLanguages.includes('english') && (
          <div className="split-view-baani-wrapper">
            {gurbani.map(({ shabad }) => <Translation type="english" key={shabad.id}>{shabad.translation.english.ssk}</Translation>)}
          </div>
        )}
        {translationLanguages.includes('spanish') && (
          <div className="split-view-baani-wrapper">
            {gurbani.map(({ shabad }) => <Translation type="spanish" key={shabad.id}>{shabad.translation.spanish}</Translation>)}
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
}

const stateToProps = state => state;
export default connect(stateToProps)(Shabad);
