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
  errorEvent,
} from '@/util';
import {
  getPadarthText,
  getPssEntries,
  getPssSimpleText,
  getPssText,
  isScholarReviewed,
} from '@/util/ai-translations';
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
   * @property {boolean} isDialogOpen whether the dialog is open
   *
   * @memberof Shabad
   */
  state = {
    progress: 0,
    isDialogOpen: true, // Default to open when response is fetched
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
    gurbani: PropTypes.array,
    highlight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    type: PropTypes.oneOf(['shabad', 'ang', 'hukamnama', 'sync']).isRequired,
    hideAddButton: PropTypes.bool,
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
    fullScreenMode: PropTypes.bool,
    showPinSettings: PropTypes.bool,
    readingMode: PropTypes.bool,
    rephrasedTranslation: PropTypes.object,
    isAskQuestion: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      isDialogOpen: true, // Default to open when response is fetched
      processedGurbani: props.gurbani || [],
      processedPages: props.pages || [],
      reviewEligibility: {
        isEligible: true,
        alreadyReviewed: false,
        newVersionAvailable: false,
        scholarReviewed: false,
      },
    };
  }

  componentDidMount() {
    if (this.props.isMultiPage) {
      if (this.props.pages && this.props.pages.length > 0) {
        this.processPages(this.props.pages);
      }
    } else if (this.props.gurbani) {
      this.processGurbani(this.props.gurbani);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isMultiPage) {
      if (prevProps.pages !== this.props.pages && this.props.pages && this.props.pages.length > 0) {
        this.processPages(this.props.pages);
      }
    } else if (prevProps.gurbani !== this.props.gurbani) {
      this.processGurbani(this.props.gurbani);
    }
  }

  isSundarGutkaRoute = () => this.props.location.pathname.includes('sundar-gutka');

  fetchAiTranslations = async (verseIds, bani_type='shabad') => {
    const response = await fetch('/api/ai-translations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ verse_id: verseIds, bani_type })
    });
    return response.json();
  };

  mergeAiTranslations = (gurbani, data) => {
    let scholarStatus = false;
    const verses = (data && data.verses) || {};
    const processed = gurbani.map((verse) => {
      const updatedVerse = { ...verse };
      const aiTranslation = verses[verse.verseId];

      if (aiTranslation) {
        updatedVerse.translation = { ...updatedVerse.translation };

        if (getPssEntries(aiTranslation).length > 0) {
          scholarStatus = isScholarReviewed(aiTranslation);
        }

        updatedVerse.translation.ai = {
          pss: getPadarthText(aiTranslation),
          ss: getPssText(aiTranslation),
          simple: getPssSimpleText(aiTranslation),
        };
      }
      return updatedVerse;
    });
    return { processed, scholarStatus };
  };

  processGurbani = async (gurbani) => {
    if (!gurbani) return;

    // Initialize state with input gurbani first
    this.setState({ processedGurbani: gurbani });

    const verseIds = gurbani.map((verse) => verse.verseId);
    const baniType = this.isSundarGutkaRoute() ? 'bani' : 'shabad';
    try {
      const data = await this.fetchAiTranslations(verseIds, baniType);

      const fullTranslation = Object.values(data.verses || {}).filter(entries => getPssEntries(entries).length > 0);

      if (fullTranslation.length === 0) {
        this.setState({ reviewEligibility: { isEligible: false, alreadyReviewed: false, newVersionAvailable: false } });
      }

      const { processed, scholarStatus } = this.mergeAiTranslations(gurbani, data);
      this.setState({
        processedGurbani: processed,
        reviewEligibility: { ...this.state.reviewEligibility, scholarReviewed: scholarStatus },
      });
    } catch (error) {
      console.error('Error fetching AI translations:', error);
      // Fallback to original gurbani if fetch fails
      this.setState({ processedGurbani: gurbani });
    }
  };

  processPages = async (pages) => {
    if (!pages || pages.length === 0) return;

    // Initialize state with input pages first
    this.setState({ processedPages: pages });

    const verseIds = pages.flatMap(({ page }) => page.map((verse) => verse.verseId));
    const baniType = this.isSundarGutkaRoute() ? 'bani' : 'shabad';
    try {
      const data = await this.fetchAiTranslations(verseIds, baniType);

      const fullTranslation = Object.values(data.verses || {}).filter(entries => getPssEntries(entries).length > 0);

      if (fullTranslation.length === 0) {
        this.setState({ reviewEligibility: { isEligible: false, alreadyReviewed: false, newVersionAvailable: false } });
      }

      let scholarStatus = false;
      const processedPages = pages.map((pageData) => {
        const { processed, scholarStatus: pageScholarStatus } = this.mergeAiTranslations(pageData.page, data);
        scholarStatus = pageScholarStatus;
        return { ...pageData, page: processed };
      });
      this.setState({
        processedPages,
        reviewEligibility: { ...this.state.reviewEligibility, scholarReviewed: scholarStatus },
      });
    } catch (error) {
      console.error('Error fetching AI translations:', error);
      // Fallback to original pages if fetch fails
      this.setState({ processedPages: pages });
    }
  };

  toggleDialog = () => {
    this.setState(prevState => ({
      isDialogOpen: !prevState.isDialogOpen
    }));
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
        pages,
        sgBaaniLength,
        fullScreenMode,
        showPinSettings,
        readingMode,
        ...baniProps
      },
      handleEmbed,
      handleCopyAll,
    } = this;

    const {
      info,
      highlight,
      type,
      translationLanguages,
      transliterationLanguages,
      englishTranslationLanguages,
      unicode,
      hideAddButton = true,
    } = baniProps;

    const { processedGurbani: gurbani, processedPages } = this.state;

    if (random) {
      return <Redirect to={`/shabad?id=${getShabadId(info)}`} />;
    }

    const isSundarGutkaRoute = this.isSundarGutkaRoute();
    const isAmritKeertanRoute = location.pathname.includes('amrit-keertan');
    const isParagraphMode = paragraphMode && isSundarGutkaRoute;
    const isShowFooterNav = this.props.hideMeta === false && !isMultiPage;
    const isShowMetaData = this.props.hideMeta === false && !fullScreenMode;
    const isShowControls = this.props.hideControls === false;
    const isShowRelatedShabads = !isAmritKeertanRoute && !isSundarGutkaRoute && !fullScreenMode;

    return (
      <GlobalHotKeys
        keyMap={ViewerShortcuts}
        handlers={ViewerShortcutHanders}
        root
      >
        <React.Fragment>
          {isShowControls && (
            <Controls
              media={
                hideAddButton ? supportedMedia.filter(m => (m !== 'addShabad' && m !== 'random'))
                  : ['shabad', 'hukamnama', 'ang'].includes(type)
                    ? supportedMedia
                    : supportedMedia.filter(
                      (m) => [
                        'embed',
                        'copyAll',
                        'copy',
                        'whatsapp',
                        'print',].includes(m) === false
                    )
              }
              onCopyAllClick={handleCopyAll}
              onEmbedClick={handleEmbed}
              shabad={info}
              highlight={this.props.isAskQuestion ? undefined : highlight}
              gurbani={gurbani}
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
              showPinSettings={showPinSettings}
            />
          )}
          {this.state.reviewEligibility.isEligible && englishTranslationLanguages.includes('sahib singh english') && (
            <div className="review-translations-banner">
              <h4><a className="review-translations-link" href={`/review-shabad/${info.shabadId}`}>
                {TEXTS.SHABAD_REVIEW.BANNER_HEADING}
              </a></h4>
              <p className="review-translations-description">
                {this.state.reviewEligibility.scholarReviewed
                  ? TEXTS.SHABAD_REVIEW.BANNER_BODY_REVIEWED
                  : TEXTS.SHABAD_REVIEW.BANNER_BODY_NOT_REVIEWED}
              </p>
            </div>
          )}
          <div id="shabad" className={`shabad display display-${type}`} aria-label="Shabad Container">
            <div className="shabad-container">
              {isMultiPage ? (
                <>
                  <MultiPageBaani
                    {...baniProps}
                    pages={processedPages.length > 0 ? processedPages : pages}
                    isParagraphMode={isParagraphMode}
                    isReadingMode={readingMode}
                  />
                  {this.getContinueButton()}
                </>
              ) : (
                <Baani
                  {...baniProps}
                  sgBaaniLength={sgBaaniLength}
                  isSundarGutkaRoute={isSundarGutkaRoute}
                  isParagraphMode={isParagraphMode}
                  isReadingMode={readingMode}
                  gurbani={gurbani}
                />
              )}
              {isLoadingContent && <div className="spinner" />}

              {isShowFooterNav && <FootNav info={info} type={type} nav={nav} />}

              {isShowRelatedShabads && (
                <RelatedShabads forShabadID={getShabadId(this.props.info)} />
              )}
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
        highlight: undefined,
      });

      const loadNextAng = (e) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(newUrl);
      };

      return (
        <div className="continue">
          <button className="btn btn-primary" onClick={loadNextAng}>
            Load next ang
          </button>
        </div>
      );
    }
  };

  handleCopyAll = () =>
    Promise.resolve(
      document.querySelector(`.${SHABAD_CONTENT_CLASSNAME}`).children[0].textContent
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
        ? `data-sttm-ang="${getAng(
          info.source
        )}" data-sttm-source="${getSourceId(info)}"`
        : `data-sttm-id="${getShabadId(info)}"`,
    ].join(' ');

    Promise.resolve(
      `<div ${attrs}><a href="https://sttm.co/${type === 'ang'
        ? 'ang?ang=' + getAng(info.source) + '&source=' + getSourceId(info)
        : 'shabad?id=' + getShabadId(info)
      }">SikhiToTheMax</a></div><script async src="${window.location.origin
      }/embed.js"></script>`
    )
      .then(copyToClipboard)
      .then(() => showToast(TEXTS.EMBED_COPIED))
      .catch(() => showToast(TEXTS.EMBED_FAILURE));
  };
}

const stateToProps = (state) => state;
export default connect(stateToProps)(withRouter(Shabad));
