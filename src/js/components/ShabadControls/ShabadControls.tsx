import React from 'react';
import { toggleItemInArray } from '@/util';
import {
  TEXTS,
  TRANSLATION_LANGUAGES,
  TRANSLITERATION_LANGUAGES,
} from '@/constants';
import TelevisionIcon from '../Icons/Television';
import SlidersIcon from '../Icons/Sliders';
import { State, IActionCreators } from '@/features/types';

export interface IShabadControlsProps extends State, IActionCreators {
  disableSplitView: boolean;
  disableParagraphView: boolean;
}

export default class ShabadControls extends React.PureComponent<
  IShabadControlsProps
> {
  public static defaultProps = {
    disableSplitView: false,
    disableParagraphView: true,
  };

  public render() {
    const {
      disableSplitView,
      disableParagraphView,
      showDisplayOptions,
      showFontOptions,
      translationLanguages,
      transliterationLanguages,
      larivaarAssist,
      larivaar,
      darkMode,
      unicode,
      fontSize,
      splitView,
      paragraphView,
      setFontSize,
      setTranslationLanguages,
      setTransliterationLanguages,
      resetDisplayOptions,
      resetFontOptions,
      toggleDisplayOptions,
      toggleFontOptions,
      toggleDarkMode,
      toggleLarivaarAssistOption,
      toggleLarivaarOption,
      toggleSplitViewOption,
      toggleParagraphViewOption,
      toggleUnicodeOption,
    } = this.props;
    return (
      <React.Fragment>
        <div id="shabad-controllers">
          <a
            className={`display-options-toggle shabad-controller-toggle ${
              showDisplayOptions ? 'active' : ''
            }`}
            onClick={() => toggleDisplayOptions()}
          >
            <TelevisionIcon />
            <span>{TEXTS.DISPLAY}</span>
          </a>
          <a
            className={`font-options-toggle shabad-controller-toggle ${
              showFontOptions ? 'active' : ''
            }`}
            onClick={toggleFontOptions}
          >
            <SlidersIcon />
            <span>{TEXTS.FONT}</span>
          </a>
          <a
            className={`shabad-controller-toggle ${larivaar ? 'active' : ''}`}
            onClick={toggleLarivaarOption}
          >
            <span className="custom-fa">ੳਅ</span>
            <span>{TEXTS.LARIVAAR}</span>
          </a>
          {larivaar && (
            <a
              className={`shabad-controller-toggle ${
                larivaarAssist ? 'active' : ''
              }`}
              onClick={toggleLarivaarAssistOption}
            >
              <span className="custom-fa custom-fa-assist">ੳ</span>
              <span>{TEXTS.ASSIST}</span>
            </a>
          )}
        </div>
        {showDisplayOptions && (
          <div className="display-options">
            <div className="display-option-type">
              <div className="display-option-header">
                {TEXTS.TRANSLITERATION}
              </div>
              <div className="display-option-content">
                {TRANSLITERATION_LANGUAGES.map(lang => (
                  <a
                    key={lang}
                    className={`display-option-toggle ${
                      transliterationLanguages.includes(lang) ? 'active' : ''
                    }`}
                    onClick={() =>
                      setTransliterationLanguages(
                        toggleItemInArray(lang, transliterationLanguages)
                      )
                    }
                  >
                    {lang}
                  </a>
                ))}
              </div>
            </div>
            <div className="display-option-type">
              <div className="display-option-header">{TEXTS.TRANSLATION}</div>
              <div className="display-option-content">
                {TRANSLATION_LANGUAGES.map(lang => (
                  <a
                    key={lang}
                    className={`display-option-toggle ${
                      translationLanguages.includes(lang) ? 'active' : ''
                    }`}
                    onClick={() =>
                      setTranslationLanguages(
                        toggleItemInArray(lang, translationLanguages)
                      )
                    }
                  >
                    {lang}
                  </a>
                ))}
              </div>
            </div>
            {disableSplitView ? null : (
              <div className="display-option-type">
                <div className="display-option-header">{TEXTS.SPLIT_VIEW}</div>
                <div className="display-option-content">
                  <a
                    className={`display-option-toggle ${
                      splitView ? 'active' : ''
                    }`}
                    onClick={toggleSplitViewOption}
                  >
                    {splitView ? 'Disable' : 'Enable'}
                  </a>
                </div>
              </div>
            )}
            {disableParagraphView ? null : (
              <div className="display-option-type">
                <div className="display-option-header">
                  {TEXTS.PARAGRAPH_VIEW}
                </div>
                <div className="display-option-content">
                  <a
                    className={`display-option-toggle ${
                      paragraphView ? 'active' : ''
                    }`}
                    onClick={() => toggleParagraphViewOption()}
                  >
                    {paragraphView ? 'Disable' : 'Enable'}
                  </a>
                </div>
              </div>
            )}
            <div className="display-option-type">
              <div className="display-option-header">{TEXTS.DARK_MODE}</div>
              <div className="display-option-content">
                <a
                  className={`display-option-toggle ${
                    darkMode ? 'active' : ''
                  }`}
                  onClick={toggleDarkMode}
                >
                  {darkMode ? 'Disable' : 'Enable'}
                </a>
              </div>
            </div>
            <div className="display-option-type">
              <div className="display-option-header">
                {TEXTS.RESET} {TEXTS.DISPLAY}
              </div>
              <div className="display-option-content">
                <a
                  className={`display-option-toggle`}
                  onClick={resetDisplayOptions}
                >
                  {TEXTS.RESET}
                </a>
              </div>
            </div>
          </div>
        )}
        {showFontOptions && (
          <div className="font-options">
            <div className="font-option-type">
              <div className="font-option-header">{TEXTS.FONT}</div>
              <a
                className={`shabad-controller-toggle ${
                  unicode ? 'active' : ''
                }`}
                onClick={toggleUnicodeOption}
              >
                {TEXTS.UNICODE}
              </a>
            </div>
            <div className="font-option-type">
              <div className="font-option-header">{TEXTS.FONT_SIZE}</div>
              <small className="gurbani-font">A</small>
              <input
                type="range"
                min="5"
                max="50"
                value={fontSize * 10}
                onChange={e => setFontSize(Number(e.currentTarget.value) / 10)}
                onInput={e => setFontSize(Number(e.currentTarget.value) / 10)}
              />
              <big className="gurbani-font">A</big>
            </div>
            <div className="display-option-type">
              <div className="font-option-header">
                {TEXTS.RESET} {TEXTS.FONT}
              </div>
              <div className="display-option-content">
                <a
                  className={`display-option-toggle`}
                  onClick={resetFontOptions}
                >
                  {TEXTS.RESET}
                </a>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
