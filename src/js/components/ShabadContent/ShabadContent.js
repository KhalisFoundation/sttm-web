import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { GlobalHotKeys } from 'react-hotkeys';

import Controls, { supportedMedia } from '@/components/Controls';
import FootNav from '@/components/FootNav';
import Meta from '@/components/Meta';
import ProgressBar from '@/components/ProgressBar';
import Baani from '@/components/Baani';
import RelatedShabads from '@/components/RelatedShabads';
import { MultiPageBaani } from './MultiPageBaani';

import {
  getShabadId,
  getSourceId,
  getAng,
  showToast,
  copyToClipboard,
  toAngURL,
  clickEvent,
  ACTIONS,
  errorEvent
} from '@/util';
import { TEXTS, SHABAD_CONTENT_CLASSNAME, MAX_ANGS } from '@/constants';
import { ViewerShortcuts, ViewerShortcutHanders } from '../../Shortcuts';

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
    type: PropTypes.oneOf(['shabad', 'ang', 'hukamnama', 'sync']).isRequired,
    info: PropTypes.object.isRequired,
    nav: PropTypes.shape({
      previous: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      next: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    pages: PropTypes.array,
    hideMeta: PropTypes.bool,
    hideControls: PropTypes.bool,
    controlProps: PropTypes.object,
    isLoadingContent: PropTypes.bool,
    isMultiPage: PropTypes.bool,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    random: PropTypes.bool.isRequired,
    splitView: PropTypes.bool.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    steekLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    transliterationFontSize: PropTypes.number.isRequired,
    translationFontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    centerAlignGurbani: PropTypes.bool.isRequired,
    showFullScreen: PropTypes.bool,
    paragraphMode: PropTypes.bool,
    sgBaaniLength: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }
  render() {
    const {
      props: {
        random,
        isMultiPage,
        isLoadingContent,
        paragraphMode,
        location,
        nav,
        history,
        pages,
        sgBaaniLength,
        ...baniProps
      },
      handleEmbed,
      handleCopyAll,
    } = this;

    const {
      info,
      type,
      translationLanguages,
      transliterationLanguages,
      unicode,
    } = baniProps;
    if (random) {
      return <Redirect to={`/shabad?id=${getShabadId(info)}`} />;
    }

    const isSundarGutkaRoute = location.pathname.includes('sundar-gutka');
    const isAmritKeertanRoute = location.pathname.includes('amrit-keertan');
    const isParagraphMode = paragraphMode && isSundarGutkaRoute;
    const isShowFooterNav = this.props.hideMeta === false && !isMultiPage;
    const isShowMetaData = this.props.hideMeta === false;
    const isShowControls = this.props.hideControls === false;
    return (
      <GlobalHotKeys keyMap={ViewerShortcuts} handlers={ViewerShortcutHanders} root>
        <React.Fragment >
          {isShowControls && (
            <Controls
              media={
                ['shabad', 'hukamnama', 'ang'].includes(type)
                  ? supportedMedia
                  : supportedMedia.filter(
                    m => ['embed', 'copyAll', 'copy'].includes(m) === false
                  )
              }
              onCopyAllClick={handleCopyAll}
              onEmbedClick={handleEmbed}
              {...this.props.controlProps}
            />
          )}
          {isShowMetaData && (
            <Meta
              isArrowsHidden={isMultiPage}
              isUnicode={unicode}
              info={info}
              nav={nav}
              type={type}
              translationLanguages={translationLanguages}
              transliterationLanguages={transliterationLanguages}
            />
          )}
          <div id="shabad" className={`shabad display display-${type}`}>
            <div className="shabad-container">
              {isMultiPage ?
                <>
                  <MultiPageBaani
                    {...baniProps}
                    pages={pages}
                    isParagraphMode={isParagraphMode}
                  />
                  {this.getContinueButton()}
                </>
                :
                <Baani
                  {...baniProps}
                  sgBaaniLength={sgBaaniLength}
                  isSundarGutkaRoute={isSundarGutkaRoute}
                  isParagraphMode={isParagraphMode}
                />}
              {isLoadingContent && <div className="spinner" />}

              {isShowFooterNav && (
                <FootNav info={info} type={type} nav={nav} />
              )}

              {!isAmritKeertanRoute
                &&
                <RelatedShabads forShabadID={getShabadId(this.props.info)} />}
            </div>
          </div>
          {!isMultiPage && <ProgressBar />}
        </React.Fragment>
      </GlobalHotKeys>
    );
  }

  getContinueButton = () => {
    const { pages, history } = this.props;

    if (pages.length > 0) {
      const lastPage = pages[pages.length - 1];
      const lastAng = lastPage.source.pageNo;
      const source = lastPage.source.sourceId;
      const isMaxAngsReached = lastAng === (MAX_ANGS[source] || MAX_ANGS['G']);

      if (isMaxAngsReached) {
        return null;
      }

      const newUrl = toAngURL({
        ang: lastAng + 1,
        source,
        highlight: undefined
      });

      const loadNextAng = (e) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(newUrl);
      }

      return (
        <div className="continue">
          <button className="btn btn-primary"
            onClick={loadNextAng}>
            Load next ang
          </button>
        </div>
      )
    }
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
        ? `data-sttm-ang="${getAng(info.source)}" data-sttm-source="${
        getSourceId(info)
        }"`
        : `data-sttm-id="${getShabadId(info)}"`,
    ].join(' ');

    Promise.resolve(
      `<div ${attrs}><a href="https://sttm.co/${
      type === 'ang'
        ? 'ang?ang=' + getAng(info.source) + '&source=' + getSourceId(info)
        : 'shabad?id=' + getShabadId(info)
      }">SikhiToTheMax</a></div><script async src="${
      window.location.origin
      }/embed.js"></script>`
    )
      .then(copyToClipboard)
      .then(() => showToast(TEXTS.EMBED_COPIED))
      .catch(() => showToast(TEXTS.EMBED_FAILURE));
  };
}

const stateToProps = state => state;
export default connect(stateToProps)(withRouter(Shabad));
