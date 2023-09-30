import React from 'react';
import { InView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import Actions from '../BaaniLineActions';
import Translation from '../Translation';
import Transliteration from '../Transliteration';
import Steek from './Steek';
import BaaniLine from '../BaaniLine';
import {
  TEXTS,
  SHABAD_CONTENT_CLASSNAME,
  PUNJABI_LANGUAGE,
  STEEK_LANGUAGES,
  SG_BAANIS_LENGTH_TO_EXISTS_MAP,
  SPANISH_LANGUAGE,
  HINDI_LANGUAGE,
  ENGLISH_LANGUAGE,
} from '@/constants';
import { MahankoshTooltip } from '@/components/MahankoshTooltip';

import {
  clickEvent,
  ACTIONS,
  translationMap,
  englishTranslationMap,
  transliterationMap,
  getVerseId,
  copyToClipboard,
  showToast,
  shortenURL,
  steekMap,
  hindiTranslationMap,
  isShowSehajPaathModeRoute,
} from '@/util';
import { MahankoshContext } from '@/context';
import { changeAng, prefetchAng } from './utils';

/**
 *
 *
 * @export
 * @class Baani
 * @extends {React.PureComponent}
 */

export default class Baani extends React.PureComponent {
  static defaultProps = {
    highlight: null,
  };

  static propTypes = {
    ang: PropTypes.number,
    gurbani: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['shabad', 'ang', 'hukamnama', 'sync']).isRequired,
    splitView: PropTypes.bool.isRequired,
    steekLanguages: PropTypes.array.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    englishTranslationLanguages: PropTypes.array.isRequired,
    hindiTranslationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    highlight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    translationFontSize: PropTypes.number.isRequired,
    transliterationFontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    centerAlignGurbani: PropTypes.bool.isRequired,
    showFullScreen: PropTypes.bool,
    isSundarGutkaRoute: PropTypes.bool.isRequired,
    isParagraphMode: PropTypes.bool.isRequired,
    isReadingMode: PropTypes.bool.isRequired,
    onBaaniLineClick: PropTypes.func,
    sgBaaniLength: PropTypes.string,
    visraams: PropTypes.bool,
    isScroll: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedWord: '',
      selectedWordIndex: -1,
      selectedLine: -1,
    };
  }

  clearMahankoshInformation = () => {
    this.setState((state) => {
      return {
        ...state,
        selectedLine: -1,
        selectedWord: '',
        selectedWordIndex: -1,
      };
    });
  };

  setMahankoshInformation = ({
    selectedWord,
    selectedLine,
    selectedWordIndex,
  }) => {
    this.setState((state) => {
      return {
        ...state,
        selectedLine,
        selectedWord,
        selectedWordIndex,
      };
    });
  };

  getShareLine = (shabad) => {
    const {
      translationLanguages,
      transliterationLanguages,
      steekLanguages,
    } = this.props;

    return [
      shabad.verse.unicode,
      ...transliterationLanguages.map((language) =>
        transliterationMap[language](shabad)
      ),
      ...translationLanguages.map((language) =>
        translationMap[language](shabad)
      ),
      ...steekLanguages.map((language) => steekMap[language](shabad)),
    ].join('\n');
  };

  onCopyClick = (shabad) => () =>
    copyToClipboard(this.getShareLine(shabad))
      .then(() => showToast(TEXTS.GURBAANI_COPIED))
      .then(() =>
        clickEvent({
          action: ACTIONS.LINE_SHARER,
          label: 'copy-line',
        })
      )
      .catch(() => showToast(TEXTS.COPY_FAILURE));

  onFacebookClick = (shabad) => () => {
    clickEvent({
      action: ACTIONS.LINE_SHARER,
      label: 'facebook',
    });
    const text = this.getShareLine(shabad) + '\n#sttm';
    window.open(
      `https://www.facebook.com/sharer/sharer.php?t=${encodeURIComponent(
        text
      )}&u=${encodeURIComponent(shortenURL())}`,
      '_blank',
      'noreferrer noopener'
    );
  };

  createParagraphedGurbani = (gurbani) => {
    const paragraphedGurbani = {};    
    gurbani.forEach((shabad) => {
      if (!paragraphedGurbani[shabad.paragraph]) {
        paragraphedGurbani[shabad.paragraph] = [];
      }

      paragraphedGurbani[shabad.paragraph].push(shabad);
    });

    return paragraphedGurbani;
  };

  _scrollToHighlight = () => {    
    if (this.$highlightedBaaniLine) {
      const { top } = this.$highlightedBaaniLine.getBoundingClientRect();
      const newTopPosition = window.scrollY + top;
      requestAnimationFrame(() => window.scrollTo(0, newTopPosition));
    }    
  };

  showSelectionOptions = (e) => {
    const currentShare = document.querySelector('.showShare');

    // Hides the active selection options panel
    if (currentShare) {
      currentShare.classList.remove('showShare');
    }
    const selectedDiv = e.currentTarget;

    // Show the active selection panel for current div.
    if (window.getSelection().toString()) {
      const shareDiv = selectedDiv.querySelector('.share');
      shareDiv.classList.add('showShare');
    }
  };

  removeSelection = () => {
    window.getSelection().removeAllRanges();
  };

  componentDidMount() {
    const {isScroll = true} = this.props
    isScroll && this._scrollToHighlight();
    document.addEventListener('click', this.clearMahankoshInformation);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clearMahankoshInformation);
    this._scrollToHighlight();
  }
  componentDidUpdate(prevProps) {
    const {isScroll = true} = this.props
    if (this.props.highlight !== prevProps.highlight && isScroll) {
      this._scrollToHighlight();
    }
  }

  getBaniLine = (shabad) => {
    const {
      larivaarAssist,
      larivaar,
      unicode,
      fontSize,
      lineHeight,
      fontFamily,
      highlight,
      showFullScreen,
      visraams,
    } = this.props;

    return (
      <BaaniLine
        text={shabad.verse}
        unicode={unicode}
        shouldHighlight={
          showFullScreen
            ? false
            : highlight === parseInt(getVerseId(shabad), 10)
        }
        larivaar={larivaar}
        larivaarAssist={larivaarAssist}
        fontSize={fontSize}
        lineHeight={lineHeight}
        fontFamily={fontFamily}
        visraams={visraams}
        visraam={shabad.visraam}
      />
    );
  };
  getTransliterations = (shabad) => {
    const { transliterationLanguages } = this.props;

    return transliterationLanguages.map((language) =>
      this.getTransliterationForLanguage(shabad, language)
    );
  };
  getActions = (shabad) => {
    const { type } = this.props;

    const disabledActions = ['ang', 'hukamnama'].includes(type)
      ? ['tweet']
      : ['openShabad', 'tweet'];

    return (
      <Actions
        disabledActions={disabledActions}
        shabad={shabad}
        onFacebookClick={this.onFacebookClick(shabad)}
        onCopyClick={this.onCopyClick(shabad)}
      />
    );
  };
  getSteekForLanguage = (shabad, language) => {
    const { unicode, translationFontSize } = this.props;
    return (
      <Steek
        fontSize={translationFontSize}
        key={getVerseId(shabad) + language}
        type={language}
        shabad={shabad}
        unicode={unicode}
      />
    );
  };
  getTransliterationForLanguage = (shabad, language) => {
    const { transliterationFontSize } = this.props;

    const isTransliterationExists = !!transliterationMap[language](shabad);
    if (!isTransliterationExists) return null;
    return (
      <Transliteration
        fontSize={transliterationFontSize}
        key={getVerseId(shabad) + language}
      >
        {transliterationMap[language](shabad)}
      </Transliteration>
    );
  };
  getTranslationForLanguage = (shabad, language) => {
    const { unicode, translationFontSize } = this.props;

    const translationObj = Translation.getTranslationProps({
      translationMap,
      language,
      shabad,
      unicode,
    });

    const isTranslationExists =
      !!translationObj.children || !!translationObj.text;
    if (!isTranslationExists) return null;

    return (
      <Translation
        fontSize={translationFontSize}
        key={getVerseId(shabad) + language}
        type={language}
        {...translationObj}
      />
    );
  };

  getLanguageTranslationMap = (language) => {
    if (language === ENGLISH_LANGUAGE) {
      return englishTranslationMap;
    } else if (language === HINDI_LANGUAGE) {
      return hindiTranslationMap;
    } 
    return translationMap;
  }
 
  getTranslationFromLanguageSource = (shabad, language, source) => {
    const { unicode, translationFontSize } = this.props;
    const translationMap = this.getLanguageTranslationMap(language)

    const translationObj = Translation.getTranslationProps({
      translationMap,
      language: source,
      shabad,
      unicode,
    });
    const isTranslationExists =
      !!translationObj.children || !!translationObj.text;
    if (!isTranslationExists) return null;

    return (
      <Translation
        fontSize={translationFontSize}
        key={getVerseId(shabad) + language}
        type={source}
        {...translationObj}
      />
    );
  };

  getTranslations = (shabad) => {
    const { translationLanguages } = this.props;

    return translationLanguages.map((language) =>
      this.getTranslationForLanguage(shabad, language)
    );
  };
  createShabadLine = (shabad, nodeToRender, isMatchHighlighted = false) => {
    const { highlight } = this.props;
    const verseId = parseInt(getVerseId(shabad), 10);
    const isHighlighted = highlight === verseId;
    const uniqueKey = `${verseId}-line`;

    return (
      <div
        key={uniqueKey}
        className="line"
        onMouseDown={this.removeSelection}
        ref={(node) =>
          isMatchHighlighted && isHighlighted
            ? (this.$highlightedBaaniLine = node)
            : null
        }
      >
        {nodeToRender}
      </div>
    );
  };
  createVersedGurbani = (gurbani) => {
    const versedGurbani = {};
    gurbani.forEach((shabad, idx) => {
      versedGurbani[idx] = [];
      versedGurbani[idx].push(shabad);
    });

    return versedGurbani;
  };

  filterGurbaniOnSgBaaniLength = (gurbani) => {
    const { sgBaaniLength } = this.props;
    const sgBaaniLengthExistsKey =
      SG_BAANIS_LENGTH_TO_EXISTS_MAP[sgBaaniLength];
    const filteredGurbani = gurbani.filter(
      (content) => !!content[sgBaaniLengthExistsKey]
    );
    return filteredGurbani;
  };

  normalizeGurbani = () => {
    const { isParagraphMode, isSundarGutkaRoute } = this.props;
    const { gurbani } = this.props;
    const filteredGurbani = isSundarGutkaRoute
      ? this.filterGurbaniOnSgBaaniLength(gurbani)
      : gurbani;

    if (isParagraphMode) {
      return this.createParagraphedGurbani(filteredGurbani);
    }

    return this.createVersedGurbani(filteredGurbani);
  };

  getTranslationLanguages = () => {
    const { steekLanguages, translationLanguages } = this.props;
    const isSteekSelected = steekLanguages.length;
    return isSteekSelected
      ? translationLanguages.filter((l) => l !== PUNJABI_LANGUAGE)
      : translationLanguages;
  };
  
  getEngLishTranslationLanguages = () => {
    const { englishTranslationLanguages } = this.props;
    return englishTranslationLanguages.sort();
  };
  
  getHindiTranslationLanguages = () => {
    const { hindiTranslationLanguages } = this.props;
    return hindiTranslationLanguages.sort();
  };

  getSteekLanguages = () => {
    const { steekLanguages } = this.props;
    return STEEK_LANGUAGES.filter((l) => steekLanguages.some((sL) => sL === l));
  };

  createMixedViewMarkup = () => {
    const {
      source,
      history,
      ang,
      onBaaniLineClick,
      isParagraphMode,
      isSehajPaathMode,
      isMultipage,
      transliterationLanguages,
    } = this.props;

    const normalizedGurbani = this.normalizeGurbani();
    const steekLanguages = this.getSteekLanguages();
    const paragraphModeClass = isParagraphMode ? 'paragraph-mode' : '';
    const mixedViewBaaniClass = 'mixed-view-baani';
    const totalParagraphs = Object.keys(normalizedGurbani).length - 1;
    const translationLanguages = this.getTranslationLanguages();
    const englishTranslationLanguages = this.getEngLishTranslationLanguages();
    const hindiTranslationLanguages = this.getHindiTranslationLanguages();
    const spanishTranslationLanguage = translationLanguages.includes('spanish')
    const { selectedWord, selectedWordIndex, selectedLine } = this.state;
    let lineIndex = 0;
    
    return (
      <div className={`${mixedViewBaaniClass} ${paragraphModeClass}`}>
        {Object.entries(normalizedGurbani).map(([idx, shabads]) => {          
          const isMiddleParagraph = idx == Math.ceil(totalParagraphs / 2);
          const isFirstParagraph = idx == totalParagraphs;
          const middleParagraphAttributes = isFirstParagraph
            ? {
              'data-middle-paragraph': true,
              'data-ang': ang,
            }
            : {};
          const firstParagraphAttributes = isMiddleParagraph
            ? {
              'data-first-paragraph': true,
              'data-ang': ang,
            }
            : {};
          // This is used for sehaj-paath mode, where we don't have paragraph mode
          // so we can safely tell it to highlight first pankti as first pankti is equal to first paragraph
          const highlightVerseId = shabads[0].verseId;
          const Wrapper =
            isSehajPaathMode && (isMiddleParagraph || isFirstParagraph)
              ? InView
              : 'div';
          let handleChange = undefined;
          if (isSehajPaathMode) {
            handleChange = isMiddleParagraph
              ? prefetchAng
              : changeAng({ history, source, ang });
          }
          return (           
              <Wrapper
                key={idx}
                {...firstParagraphAttributes}
                {...middleParagraphAttributes}
                onChange={handleChange}
                onClick={
                  onBaaniLineClick
                    ? onBaaniLineClick(highlightVerseId)
                    : undefined
                }
                onMouseUp={
                  isParagraphMode ? undefined : this.showSelectionOptions
                } // In paragraph mode, we are currently not showing social Share
                onMouseDown={isParagraphMode ? undefined : this.removeSelection}
                className={`${mixedViewBaaniClass}-wrapper ${paragraphModeClass}`}
              >
                <div
                  className={`${mixedViewBaaniClass}-paragraph ${paragraphModeClass}`}
                >
                  {
                    shabads.map((shabad) => {
                      lineIndex++;
                       return (<MahankoshContext.Provider
                          key={lineIndex}
                          value={{
                            currentLine: lineIndex,
                            selectedLine,
                            selectedWord,
                            selectedWordIndex,
                            setMahankoshInformation: this.setMahankoshInformation,
                          }}
                        >
                        {
                          this.createShabadLine(
                            shabad,
                            this.getBaniLine(shabad),
                            true
                          )    
                        }
                      </MahankoshContext.Provider>)
                    })
                  }
                </div>
                <div
                  className={`${mixedViewBaaniClass}-transliteration ${paragraphModeClass}`}
                >
                  {transliterationLanguages.map((language) => (
                    <div
                      key={language}
                      className={`${mixedViewBaaniClass}-transliteration-${language} ${paragraphModeClass}`}
                    >
                      {shabads.map((shabad) =>
                        this.createShabadLine(
                          shabad,
                          this.getTransliterationForLanguage(shabad, language)
                        )
                      )}
                    </div>
                  ))}
                </div>                
                {/* English Translation Languages */}
                <div
                  className={`${mixedViewBaaniClass}-translation ${paragraphModeClass}`}
                >
                  {englishTranslationLanguages.map((source) => (
                    <div
                      key={source}
                      className={`${mixedViewBaaniClass}-translation-${ENGLISH_LANGUAGE} ${paragraphModeClass}`}
                    >
                      {shabads.map((shabad) =>
                        this.createShabadLine(
                          shabad,
                          this.getTranslationFromLanguageSource(shabad, ENGLISH_LANGUAGE, source)
                        )
                      )}
                    </div>
                  ))}
                </div>
                {/* Spanish Translation Languages */}
                <div
                  className={`${mixedViewBaaniClass}-translation ${paragraphModeClass}`}
                >
                  {
                  spanishTranslationLanguage && (
                    <>
                      <div
                        key={SPANISH_LANGUAGE}
                        className={`${mixedViewBaaniClass}-translation-${SPANISH_LANGUAGE} ${paragraphModeClass}`}
                      >
                        {shabads.map((shabad) =>
                          this.createShabadLine(
                            shabad,
                            this.getTranslationForLanguage(shabad, SPANISH_LANGUAGE)
                          )
                        )}
                      </div>                      
                    </>
                  )}
                </div>
                {/* Punjabi Translation Languages */}
                <div
                  className={`${mixedViewBaaniClass}-steek ${paragraphModeClass}`}
                >
                  {steekLanguages.map((language) => (
                    <div
                      key={language}
                      className={`${mixedViewBaaniClass}-steek-${language} ${paragraphModeClass}`}
                    >
                      {shabads.map((shabad) =>
                        this.createShabadLine(
                          shabad,
                          this.getSteekForLanguage(shabad, language)
                        )
                      )}
                    </div>
                  ))}
                </div>
                {/* Hindi Translation Languages */}
                <div
                  className={`${mixedViewBaaniClass}-translation ${paragraphModeClass}`}
                >
                  {hindiTranslationLanguages.map((source) => (
                    <div
                      key={source}
                      className={`${mixedViewBaaniClass}-translation-${HINDI_LANGUAGE} ${paragraphModeClass}`}
                    >
                      {shabads.map((shabad) =>
                        this.createShabadLine(
                          shabad,
                          this.getTranslationFromLanguageSource(shabad, HINDI_LANGUAGE, source)
                        )
                      )}
                    </div>
                  ))}
                </div>
                
                {isParagraphMode ? null : (
                  <div
                    className={`${mixedViewBaaniClass}-actions ${paragraphModeClass}`}
                  >
                    {shabads.map((shabad) =>
                      this.createShabadLine(shabad, this.getActions(shabad))
                    )}
                  </div>
                )}
               
              </Wrapper>            
          )
        })
        }
        {isSehajPaathMode ? (
          <h4 className="separator">
            {source === 'G' ? 'Ang' : 'Pannaa'} {ang + 1}
          </h4>
        ) : null}
      </div>
    )
  }
  createFullScreenMarkup = () => {
    const { gurbani, highlight } = this.props;

    return (
      <div className="full-screen-baani">
        {gurbani.map((shabad) =>
          highlight === parseInt(getVerseId(shabad), 10) ? (
            <div
              key={getVerseId(shabad)}
              id={`line-${getVerseId(shabad)}`}
              className="line"
              onMouseUp={this.showSelectionOptions}
              onMouseDown={this.removeSelection}
            >
              {this.getBaniLine(shabad)}
              {this.getTransliterations(shabad)}
              {this.getTranslations(shabad)}
              {this.getActions(shabad)}
            </div>
          ) : (
              ''
            )
        )}
      </div>
    );
  };
  createSplitViewMarkup = () => {
    const {
      isParagraphMode,
      unicode,
      fontSize,
      highlight,
      transliterationLanguages,
      translationFontSize,
      transliterationFontSize,
    } = this.props;

    const steekLanguages = this.getSteekLanguages();
    const normalizedGurbani = this.normalizeGurbani();
    const paragraphModeClass = isParagraphMode ? 'paragraph-mode' : '';
    const splitViewBaaniClass = 'split-view-baani';
    const translationLanguages = this.getTranslationLanguages();
    const englishTranslationLanguages = this.getEngLishTranslationLanguages();
    const hindiTranslationLanguages = this.getHindiTranslationLanguages();
    const spanishTranslationLanguage = translationLanguages.includes('spanish')

    return (
      <div className={`${splitViewBaaniClass} ${paragraphModeClass}`}>
        <div className={`${splitViewBaaniClass}-wrapper ${paragraphModeClass}`}>
          {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
            <div
              className={`${splitViewBaaniClass}-paragraph ${paragraphModeClass}`}
              key={idx}
            >
              {shabads.map((shabad) => (
                <div
                  id={`line${getVerseId(shabad)}-line`}
                  key={getVerseId(shabad)}
                  className="line"
                  ref={(node) =>
                    highlight === parseInt(getVerseId(shabad), 10)
                      ? (this.$highlightedBaaniLine = node)
                      : null
                  }
                >
                  {this.getBaniLine(shabad)}
                  {this.getActions(shabad)}
                </div>
              ))}
            </div>
          ))}
        </div>
        {transliterationLanguages.map((language) => {
          return (
            <div
              key={language}
              className={`${splitViewBaaniClass}-wrapper ${paragraphModeClass}`}
            >
              {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
                <div
                  className={`${splitViewBaaniClass}-transliteration ${paragraphModeClass}`}
                  key={idx}
                >
                  {shabads.map((shabad) => (
                    <Transliteration
                      fontSize={transliterationFontSize}
                      key={getVerseId(shabad)}
                    >
                      {transliterationMap[language](shabad)}
                    </Transliteration>
                  ))}
                </div>
              ))}
            </div>
          );
        })}        
         {/* English Translation Languages */}
         {englishTranslationLanguages.map((source) => (
           <div
            key={ENGLISH_LANGUAGE + source}
            className={`${splitViewBaaniClass}-wrapper ${paragraphModeClass}`}
          >
            {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
              <div
                key={idx}
                className={`${splitViewBaaniClass}-translation ${paragraphModeClass}`}
              >
                {shabads.map((shabad) => (
                  <Translation
                    fontSize={translationFontSize}
                    key={getVerseId(shabad) + ENGLISH_LANGUAGE}
                    type={source}
                    {...Translation.getTranslationProps({
                      translationMap: englishTranslationMap,
                      language: source,
                      shabad,
                      unicode,
                    })}
                  />
                ))}
              </div>
            ))}
          </div>
          ))}
          {/* Spanish Translation Languages */}
         {spanishTranslationLanguage &&
           (<div
            key={SPANISH_LANGUAGE}
            className={`${splitViewBaaniClass}-wrapper ${paragraphModeClass}`}
          >
            {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
              <div
                key={idx}
                className={`${splitViewBaaniClass}-translation ${paragraphModeClass}`}
              >
                {shabads.map((shabad) => (
                  <Translation
                    fontSize={translationFontSize}
                    key={getVerseId(shabad) + SPANISH_LANGUAGE}
                    type={SPANISH_LANGUAGE}
                    {...Translation.getTranslationProps({
                      translationMap,
                      language: SPANISH_LANGUAGE,
                      shabad,
                      unicode,
                    })}
                  />
                ))}
              </div>
            ))}
          </div>
          )} 
         {/* Punjabi Translation Languages */}
        {steekLanguages.map((language) => (
          <div
            key={language}
            className={`${splitViewBaaniClass}-wrapper ${paragraphModeClass}`}
          >
            {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
              <div
                key={idx}
                className={`${splitViewBaaniClass}-steek ${paragraphModeClass}`}
              >
                {shabads.map((shabad) => (
                  <Steek
                    fontSize={translationFontSize}
                    key={getVerseId(shabad) + language}
                    type={language}
                    shabad={shabad}
                    unicode={unicode}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
         {/* Hindi Translation Languages */}
         {hindiTranslationLanguages.map((source) => (
           <div
            key={HINDI_LANGUAGE + source}
            className={`${splitViewBaaniClass}-wrapper ${paragraphModeClass}`}
          >
            {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
              <div
                key={idx}
                className={`${splitViewBaaniClass}-translation ${paragraphModeClass}`}
              >
                {shabads.map((shabad) => (
                  <Translation
                    fontSize={translationFontSize}
                    key={getVerseId(shabad) + HINDI_LANGUAGE}
                    type={source}
                    {...Translation.getTranslationProps({
                      translationMap: hindiTranslationMap,
                      language: source,
                      shabad,
                      unicode,
                    })}
                  />
                ))}
              </div>
            ))}
          </div>
          ))} 
      </div>
    );
  };
  createReadingModeMarkup  = () => {
    const {
      isReadingMode,
      larivaarAssist,
      larivaar,
      unicode,
      fontSize,
      lineHeight,
      fontFamily,
      highlight,
      showFullScreen,
      visraams,
      transliterationLanguages,
      translationFontSize,
      transliterationFontSize,
    } = this.props;
    const readingModeBaaniClass = 'reading-mode-baani';
    const steekLanguages = this.getSteekLanguages();
    const normalizedGurbani = this.normalizeGurbani();
    const translationLanguages = this.getTranslationLanguages();
    const englishTranslationLanguages = this.getEngLishTranslationLanguages();
    const hindiTranslationLanguages = this.getHindiTranslationLanguages();
    const spanishTranslationLanguage = translationLanguages.includes('spanish')
    const shabads = Object.entries(normalizedGurbani).map(([idx, shabads]) => shabads.map(shabad => shabad)).flat();
    return (
      <div>
        {shabads.map(shabad => {
          return(
            <div key={shabad.verseId} className={`${unicode ? 'unicode' : 'gurlipi-reading-mode'}`}>
              <BaaniLine
                text={shabad.verse}
                unicode={unicode}
                shouldHighlight={
                  showFullScreen
                    ? false
                    : highlight === parseInt(getVerseId(shabad), 10)
                }
                larivaar={larivaar}
                larivaarAssist={larivaarAssist}
                fontSize={fontSize}
                lineHeight={lineHeight}
                fontFamily={fontFamily}
                visraams={visraams}
                visraam={shabad.visraam}
                isReadingMode={isReadingMode}
                key={shabad.verseId}
                />
              </div>
          )
        })}
      {transliterationLanguages.map((language) => {
          return (
            <div
              key={language}
              className={`${readingModeBaaniClass}-wrapper`}
            >
              {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
                <div
                  className={`${readingModeBaaniClass}-transliteration`}
                  key={idx}
                >
                  {shabads.map((shabad) => (
                    <Transliteration
                      fontSize={transliterationFontSize}
                      key={getVerseId(shabad)}
                      isReadingMode={isReadingMode}
                    >
                      {transliterationMap[language](shabad)}
                    </Transliteration>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
        
        {/* English Translation Languages */}
         {englishTranslationLanguages.map((source) => (
           <div
            key={ENGLISH_LANGUAGE + source}
            className={`${readingModeBaaniClass}-wrapper`}
          >
            {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
              <div
                key={idx}
                className={`${readingModeBaaniClass}-translation`}
              >
                {shabads.map((shabad) => (
                  <Translation
                    fontSize={translationFontSize}
                    key={getVerseId(shabad) + ENGLISH_LANGUAGE}
                    type={source}
                    {...Translation.getTranslationProps({
                      translationMap: englishTranslationMap,
                      language: source,
                      shabad,
                      unicode,
                    })}
                    isReadingMode={isReadingMode}
                  />
                ))}
              </div>
            ))}
          </div>
          ))}
          {/* Hindi Translation Languages */}
         {hindiTranslationLanguages.map((source) => (
           <div
            key={HINDI_LANGUAGE + source}
            className={`${readingModeBaaniClass}-wrapper`}
          >
            {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
              <div
                key={idx}
                className={`${readingModeBaaniClass}-translation`}
              >
                {shabads.map((shabad) => (
                  <Translation
                    fontSize={translationFontSize}
                    key={getVerseId(shabad) + HINDI_LANGUAGE}
                    type={source}
                    {...Translation.getTranslationProps({
                      translationMap: hindiTranslationMap,
                      language: source,
                      shabad,
                      unicode,
                    })}
                    isReadingMode={isReadingMode}
                  />
                ))}
              </div>
            ))}
          </div>
          ))}
          {/* Punjabi Translation Languages */}
        {steekLanguages.map((language) => (
          <div
            key={language}
            className={`${readingModeBaaniClass}-wrapper`}
          >
            {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
              <div
                key={idx}
                className={`${readingModeBaaniClass}-steek`}
              >
                {shabads.map((shabad) => (
                  <Steek
                    fontSize={translationFontSize}
                    key={getVerseId(shabad) + language}
                    type={language}
                    shabad={shabad}
                    unicode={unicode}
                    isReadingMode={isReadingMode}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
        {/* Spanish Translation Languages */}
         {spanishTranslationLanguage &&
           (<div
            key={SPANISH_LANGUAGE}
            className={`${readingModeBaaniClass}-wrapper`}
          >
            {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
              <div
                key={idx}
                className={`${readingModeBaaniClass}-translation`}
              >
                {shabads.map((shabad) => (
                  <Translation
                    fontSize={translationFontSize}
                    key={getVerseId(shabad) + SPANISH_LANGUAGE}
                    type={SPANISH_LANGUAGE}
                    {...Translation.getTranslationProps({
                      translationMap,
                      language: SPANISH_LANGUAGE,
                      shabad,
                      unicode,
                    })}
                    isReadingMode={isReadingMode}
                  />
                ))}
              </div>
            ))}
          </div>
          )}
        </div>
    )
  }
  getMarkup = () => {
    const { splitView, showFullScreen, isReadingMode, history} = this.props;
    const isSehajPaathMode = isShowSehajPaathModeRoute(history.location.pathname);
    if (showFullScreen) {
      return this.createFullScreenMarkup();
    } else if (splitView) {
      return this.createSplitViewMarkup();
    } else if (isReadingMode && !isSehajPaathMode) {
      return this.createReadingModeMarkup();
    }

    return this.createMixedViewMarkup();
  };
  render() {
    const { centerAlignGurbani, showFullScreen } = this.props;
    const { selectedWord } = this.state;
    return (
      <div
        className={`${SHABAD_CONTENT_CLASSNAME} ${centerAlignGurbani || showFullScreen ? ' center-align' : ''
          }`}
      >
        {this.getMarkup()}
        <MahankoshTooltip
          clearMahankoshInformation={this.clearMahankoshInformation}
          tooltipId="mahankoshTooltipHighlightSearchResult"
          gurbaniWord={selectedWord}
        />
      </div>
    );
  }
}
