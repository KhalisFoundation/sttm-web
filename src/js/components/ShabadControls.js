import React from 'react';
import { toggleItemInArray } from '../util';
import {
    TRANSLATION_LANGUAGES,
    TRANSLITERATION_LANGUAGES,
} from '../constants';

export default function ShabadControls({
  disableSplitView = false,
  showDisplayOptions,
  showFontOptions,
  showTransliterationOptions,
  showTranslationOptions,
  translationLanguages = [],
  transliterationLanguages = [],
  larivaarAssist,
  larivaar,
  unicode,
  fontSize,
  splitView,
  setFontSize,
  setTranslationLanguages,
  setTransliterationLanguages,
  toggleDisplayOptions,
  toggleFontOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleSplitViewOption,
  toggleUnicodeOption,
}) {
  return (
    <React.Fragment>
      <div id="shabad-controllers">
        <a className={`shabad-controller-toggle ${showDisplayOptions ? 'active' : ''}`} onClick={toggleDisplayOptions}>
          <i className="fa fa-television" />
          <span>Display</span>
        </a>
        <a className={`shabad-controller-toggle ${showFontOptions ? 'active' : ''}`} onClick={toggleFontOptions}>
          <i className="fa fa-sliders" />
          <span>Font</span>
        </a>
        <a className={`shabad-controller-toggle ${larivaar ? 'active' : ''}`} onClick={toggleLarivaarOption}>
          <span className="custom-fa">ੳਅ</span>
          <span>Larivaar</span>
        </a>
        {larivaar && (
          <a className={`shabad-controller-toggle ${larivaarAssist ? 'active' : ''}`} onClick={toggleLarivaarAssistOption}>
            <span className="custom-fa custom-fa-assist">ੳ</span>
            <span>Assist</span>
          </a>
        )}
      </div>
      {showDisplayOptions && (
        <div id="display-options">
          <div className="display-option-type">
            <div className="display-option-header">Transliteration</div>

            {TRANSLITERATION_LANGUAGES.map(lang => (
              <a
                key={lang}
                className={`display-option-toggle ${transliterationLanguages.includes(lang) ? 'active' : ''}`}
                onClick={() => setTransliterationLanguages(
                  toggleItemInArray(lang, transliterationLanguages),
                )}
              >
                {lang}
              </a>
            ))}
          </div>
          <div className="display-option-type">
            <div className="display-option-header">Translation</div>
            {TRANSLATION_LANGUAGES.map(lang => (
              <a
                key={lang}
                className={`display-option-toggle ${translationLanguages.includes(lang) ? 'active' : ''}`}
                onClick={() => setTranslationLanguages(
                  toggleItemInArray(lang, translationLanguages),
                )}
              >
                {lang}
              </a>
            ))}
          </div>
          {
            disableSplitView
              ? null
              : (
                <div className="display-option-type">
                  <div className="display-option-header">Split View</div>
                  <a
                    className={`display-option-toggle ${splitView ? 'active' : ''}`}
                    onClick={toggleSplitViewOption}
                  >
                    {splitView ? 'Disable' : 'Enable'}
                  </a>
                </div>
              )}
        </div>
      )}
      {showFontOptions && (
        <div id="font-options">
          <div className="font-option-type">
            <div className="font-option-header">Font</div>
            <a className={`shabad-controller-toggle ${unicode ? 'active' : ''}`} onClick={toggleUnicodeOption}>Unicode</a>
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
