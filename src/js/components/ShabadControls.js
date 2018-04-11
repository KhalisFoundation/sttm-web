import React from 'react';
import PropTypes from 'prop-types';
import { toggleItemInArray } from '../util';
import { TRANSLATION_LANGUAGES, TRANSLITERATION_LANGUAGES } from '../constants';
import TelevisionIcon from './Icons/Television';
import SlidersIcon from './Icons/Sliders';

export default class ShabadControls extends React.PureComponent {
  static defaultProps = {
    disableSplitView: false,
  };

  static propTypes = {
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    darkMode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    disableSplitView: PropTypes.bool.isRequired,
    showDisplayOptions: PropTypes.bool.isRequired,
    showFontOptions: PropTypes.bool.isRequired,
    splitView: PropTypes.bool.isRequired,
    setFontSize: PropTypes.func.isRequired,
    setTranslationLanguages: PropTypes.func.isRequired,
    setTransliterationLanguages: PropTypes.func.isRequired,
    toggleDisplayOptions: PropTypes.func.isRequired,
    toggleFontOptions: PropTypes.func.isRequired,
    toggleLarivaarAssistOption: PropTypes.func.isRequired,
    toggleDarkMode: PropTypes.func.isRequired,
    toggleLarivaarOption: PropTypes.func.isRequired,
    toggleSplitViewOption: PropTypes.func.isRequired,
    toggleUnicodeOption: PropTypes.func.isRequired,
  };

  render() {
    const {
      disableSplitView,
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
      setFontSize,
      setTranslationLanguages,
      setTransliterationLanguages,
      toggleDisplayOptions,
      toggleFontOptions,
      toggleDarkMode,
      toggleLarivaarAssistOption,
      toggleLarivaarOption,
      toggleSplitViewOption,
      toggleUnicodeOption,
    } = this.props;
    return (
      <React.Fragment>
        <div id="shabad-controllers">
          <a
            data-test-id="display-options"
            className={`display-options-toggle shabad-controller-toggle ${
              showDisplayOptions ? 'active' : ''
            }`}
            onClick={toggleDisplayOptions}
          >
            <TelevisionIcon />
            <span>Display</span>
          </a>
          <a
            className={`font-options-toggle shabad-controller-toggle ${
              showFontOptions ? 'active' : ''
            }`}
            onClick={toggleFontOptions}
          >
            <SlidersIcon />
            <span>Font</span>
          </a>
          <a
            className={`shabad-controller-toggle ${larivaar ? 'active' : ''}`}
            onClick={toggleLarivaarOption}
          >
            <span className="custom-fa">ੳਅ</span>
            <span>Larivaar</span>
          </a>
          {larivaar && (
            <a
              className={`shabad-controller-toggle ${
                larivaarAssist ? 'active' : ''
              }`}
              onClick={toggleLarivaarAssistOption}
            >
              <span className="custom-fa custom-fa-assist">ੳ</span>
              <span>Assist</span>
            </a>
          )}
        </div>
        {showDisplayOptions && (
          <div className="display-options">
            <div className="display-option-type">
              <div className="display-option-header">Transliteration</div>
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
              <div className="display-option-header">Translation</div>
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
                <div className="display-option-header">Split View</div>
                <div className="display-option-content">
                  <a
                    data-test-id="split-view"
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
            <div className="display-option-type">
              <div className="display-option-header">Dark Mode</div>
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
          </div>
        )}
        {showFontOptions && (
          <div className="font-options">
            <div className="font-option-type">
              <div className="font-option-header">Font</div>
              <a
                className={`shabad-controller-toggle ${
                  unicode ? 'active' : ''
                }`}
                onClick={toggleUnicodeOption}
              >
                Unicode
              </a>
            </div>
            <div className="font-option-type">
              <div className="font-option-header">Font Size</div>
              <small className="gurbani-font">A</small>
              <input
                type="range"
                min="5"
                max="50"
                defaultValue={fontSize * 10}
                onChange={e => setFontSize(e.currentTarget.value / 10)}
                onInput={e => setFontSize(e.currentTarget.value / 10)}
              />
              <big className="gurbani-font">A</big>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
