import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clickEvent, ACTIONS, errorEvent } from '@/util/analytics';
import { showToast, copyToClipboard } from '@/util';
import Controls from '@/components/Controls';
import FootNav from '@/components/FootNav';
import Meta from '@/components/Meta';
import ProgressBar from '@/components/ProgressBar';
import Baani from '@/components/Baani';
import { TEXTS, SHABAD_CONTENT_CLASSNAME } from '@/constants';

/**
 *
 *
 * @class Shabad
 * @augments {React.PureComponent<ShabadProps, ShabadState>}
 */
class Shabad extends React.PureComponent {
  /**
   * @typedef {object} ShabadState
   * @property {number} progress of vertical scroll
   *
   * @memberof Shabad
   */
  state = {
    progress: 0,
  };

  static defaultProps = {
    random: false,
    nav: {},
    hideControls: false,
    hideMeta: false,
    controlProps: {},
  };

  /**
   * @typedef {object} ShabadProps
   * @property {array} gurbani
   * @property {number} highlight LineNo of highlighted shabad line
   * @property {ShabadContentTypes} type of shabad
   * @property {{ previous: string, next: string }} nav
   * @property {object} info
   * @property {boolean} [hideMeta=false]
   * @property {boolean} [hideControls=false]
   * @property {{}} controlProps override props passed to <Controls />.
   *
   * TODO: Refactor code to support render props to allow different configurations.
   *
   * @memberof Shabad
   */
  static propTypes = {
    gurbani: PropTypes.array.isRequired,
    highlight: PropTypes.number,
    type: PropTypes.oneOf(['shabad', 'ang', 'hukamnama']).isRequired,
    info: PropTypes.object.isRequired,
    nav: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string,
    }),
    hideMeta: PropTypes.bool,
    hideControls: PropTypes.bool,
    controlProps: PropTypes.object,

    random: PropTypes.bool.isRequired,
    splitView: PropTypes.bool.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
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
        {this.props.hideControls === false && (
          <Controls
            media={
              ['shabad', 'hukamnama', 'ang'].includes(type)
                ? Controls.supportedMedia
                : Controls.supportedMedia.filter(
                    m => ['embed', 'copyAll', 'copy'].includes(m) === false
                  )
            }
            onCopyAllClick={handleCopyAll}
            onEmbedClick={handleEmbed}
            {...this.props.controlProps}
          />
        )}
        {this.props.hideMeta === false && (
          <Meta
            info={info}
            nav={nav}
            type={type}
            translationLanguages={translationLanguages}
            transliterationLanguages={transliterationLanguages}
          />
        )}
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
            {this.props.hideMeta === false && (
              <FootNav info={info} type={type} nav={nav} />
            )}
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
    const { info, type } = this.props;

    clickEvent({ action: ACTIONS.SHARE, label: 'embed' });

    const attrs = [
      `data-sttm-height="500"`,
      `data-sttm-width="500"`,
      type === 'ang'
        ? `data-sttm-ang="${info.source.pageno}" data-sttm-source="${
            info.source.id
          }"`
        : `data-sttm-id="${info.id}"`,
    ].join(' ');

    Promise.resolve(
      `<div ${attrs}><a href="https://sttm.co/embed?id=${
        info.id
      }">SikhiToTheMax</a></div><script async src="https://sttm.co/embed.js"></script>`
    )
      .then(copyToClipboard)
      .then(() => showToast(TEXTS.EMBED_COPIED))
      .catch(() => showToast(TEXTS.EMBED_FAILURE));
  };
}

const stateToProps = state => state;
export default connect(stateToProps)(Shabad);
