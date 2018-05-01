import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clickEvent, ACTIONS, errorEvent } from '../util/analytics';
import { showToast, copyToClipboard } from '../util';
import Controls, { supportedMedia } from './Controls';
import FootNav from './FootNav';
import Meta from './Meta';
import ProgressBar from './ProgressBar';
import Baani from './Baani';
import { TEXTS, SHABAD_CONTENT_CLASSNAME } from '../constants';

class Shabad extends React.PureComponent {
  state = {
    progress: 0,
  };

  static defaultProps = {
    random: false,
    nav: {},
  };

  static propTypes = {
    gurbani: PropTypes.array.isRequired,
    highlight: PropTypes.number,
    random: PropTypes.bool.isRequired,
    splitView: PropTypes.bool.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['shabad', 'ang', 'hukamnama']).isRequired,
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
      props: {
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
        highlight,
        unicode,
        fontSize,
      },
      handleEmbed,
      handleCopyAll,
    } = this;

    if (random) {
      return <Redirect to={`/shabad?id=${info.id}`} />;
    }

    return (
      <React.Fragment>
        <Controls
          media={
            type === 'shabad'
              ? supportedMedia
              : supportedMedia.filter(
                  m => ['embed', 'copyAll', 'copy'].includes(m) === false
                )
          }
          onCopyAllClick={handleCopyAll}
          onEmbedClick={handleEmbed}
        />
        <Meta info={info} nav={nav} type={type} />
        <div id="shabad" className="shabad display">
          <div className="shabad-container">
            <Baani
              type={type}
              gurbani={gurbani}
              splitView={splitView}
              unicode={unicode}
              highlight={highlight}
              larivaar={larivaar}
              fontSize={fontSize}
              larivaarAssist={larivaarAssist}
              translationLanguages={translationLanguages}
              transliterationLanguages={transliterationLanguages}
            />
            <FootNav info={info} type={type} nav={nav} />
          </div>
        </div>
        <ProgressBar percent={this.state.progress} />
      </React.Fragment>
    );
  }

  scrollListener = () => {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const maxY =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = parseFloat((y / maxY).toPrecision(2));
      this.setState({ progress });
    });
  };

  componentDidMount() {
    addEventListener('scroll', this.scrollListener, { passive: true });
    this.scrollListener();
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.scrollListener);
  }

  handleCopyAll = () =>
    Promise.resolve(
      document.querySelector(`.${SHABAD_CONTENT_CLASSNAME}`).textContent
    )
      .then(copyToClipboard)
      .then(() => showToast(TEXTS.GURBAANI_COPIED))
      .then(() => clickEvent({ action: ACTIONS.SHARE, label: 'copy-all' }))
      .catch(({ message: label = '' } = {}) =>
        errorEvent({ action: 'copy-all-failure', label })
      );

  handleEmbed = () => {
    const { info } = this.props;

    clickEvent({ action: ACTIONS.SHARE, label: 'embed' });

    Promise.resolve(
      `<div data-sttm-height="500" data-sttm-width="500" data-sttm-id="${
        info.id
      }">SikhiToTheMax</div><script async src="https://sttm.co/embed.js"></script>`
    )
      .then(copyToClipboard)
      .then(() => showToast(TEXTS.EMBED_COPIED))
      .catch(() => showToast(TEXTS.EMBED_FAILURE));
  };
}

const stateToProps = state => state;
export default connect(stateToProps)(Shabad);
