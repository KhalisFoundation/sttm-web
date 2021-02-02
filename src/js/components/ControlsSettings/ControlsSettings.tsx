import React from 'react';
import Collapsible from 'react-collapsible';
import Times from '../Icons/Times';
import { MinusIcon, PlusIcon, SplitViewIcon, GlobeIcon, MicrophoneIcon, SolidArrowRight } from "../Icons/CustomIcons";
import {
  TEXTS,
  // TRANSLATION_LANGUAGES,
  // TRANSLITERATION_LANGUAGES,
  FONT_OPTIONS,
  // VISRAAM,
} from '../../constants';

const ControlsSettings = (props) => {

  const handleListItemClick = () => {
    console.log('list item clicked');
  }

    const {
      // centerAlignGurbani,
      // disableSplitView,
      // showDisplayOptions,
      // showFontOptions,
      // translationLanguages,
      // transliterationLanguages,
      larivaarAssist,
      larivaar,
      darkMode,
      visraams,
      fontFamily,
      splitView,
      resetDisplayOptions,
      toggleDarkMode,
      toggleLarivaarAssistOption,
      toggleLarivaarOption,
      toggleSplitViewOption,
      toggleVisraams,
      changeFont,
    } = props;


   return (
     <>
        <div className="settings-panel">
          <div className="settings-header">
            <p className="settings-heading">Settings</p>
            <a className="settings-times"><Times /></a>
          </div>
          <div className="settings-items settings-border">
            <div className={`settings-item ${darkMode ? 'settings-active-item' : ''}`} onClick={toggleDarkMode}>
              <span className="settings-action-icon"><Times /></span>
              <span className="settings-text">{TEXTS.DARK_MODE}</span>
            </div>
            <div className={`settings-item ${visraams ? 'settings-active-item' : ''}`} onClick={toggleVisraams}>
              <span className="settings-action-icon"><Times /></span>
              <span className="settings-text">{TEXTS.VISRAAMS}</span>
            </div>
            <div className={`settings-item ${splitView ? 'settings-active-item' : ''}`} onClick={toggleSplitViewOption}>
              <span className="settings-action-icon"><SplitViewIcon className="settings-action-icon" /></span>
              <span className="settings-text">{TEXTS.SPLIT_VIEW}</span>
            </div>
            <div className="settings-item" onClick={toggleLarivaarOption}>
              <span className="settings-action-icon small-font">ੳਅ</span>
              <span className="settings-text">{TEXTS.LARIVAAR}</span>
              {/* {larivaar && (
                <a
                  className={`shabad-controller-toggle ${larivaarAssist ? 'active' : ''
                    }`}
                  onClick={toggleLarivaarAssistOption}
                >
                  <span className="custom-fa custom-fa-assist">ੳ</span>
                  <span className='display-options-label'>{TEXTS.ASSIST}</span>
                </a>
              )} */}
            </div>

            <Collapsible trigger={(
              <div className="settings-item" onClick={listItem}>
                <span className="settings-action-icon"><Times /></span>
                <span className="settings-text">{TEXTS.VISRAAMS}</span>
                <div className="flex-spacer" />
                <span className="settings-chevron-icon">
                  <SolidArrowRight />
                </span>
              </div>
            )}>
              {/* <MultiSelect
                collections={this.props.collections}
                dropdownLabel={this.props.label}
              /> */}
              <p>This</p>
            </Collapsible>
            <Collapsible trigger={(
              <div className="settings-item" onClick={listItem}>
                <span className="settings-action-icon"><GlobeIcon /></span>
                <span className="settings-text">{TEXTS.TRANSLATION}</span>
                <div className="flex-spacer" />
                <span className="settings-chevron-icon">
                  <SolidArrowRight />
                </span>
              </div>
            )}>
              {/* <MultiSelect
                collections={this.props.collections}
                dropdownLabel={this.props.label}
              /> */}
              <p>This</p>
            </Collapsible>
            <Collapsible trigger={(
              <div className="settings-item" onClick={listItem}>
                <span className="settings-action-icon"><MicrophoneIcon /></span>
                <span className="settings-text">{TEXTS.TRANSLITERATION}</span>
                <div className="flex-spacer" />
                <span className="settings-chevron-icon">
                  <SolidArrowRight />
                </span>
              </div>
            )}>
              {/* <MultiSelect
                collections={this.props.collections}
                dropdownLabel={this.props.label}
              /> */}
              <p>This</p>
            </Collapsible>
          </div>
          <div className="settings-advance">
            <div className="settings-item" onClick={listItem}>
              <span className="settings-heading">Fonts & Sizes</span>
            </div>
            <div className="settings-items pt-0">
              <div className="settings-item font-item">
                <button className="font-size-control" onClick={listItem}><MinusIcon className="minus-icon" /></button>
                <select
                  className="font-family-dropdown"
                  value={fontFamily}
                  onChange={e => changeFont(e.currentTarget.value)}
                >
                  {Object.keys(FONT_OPTIONS).map(key => (
                    <option key={key} value={key}>
                      {FONT_OPTIONS[key]}
                    </option>
                  ))}
                </select>
                <button className="font-size-control" onClick={listItem}><PlusIcon className="plus-icon" /></button>
              </div>
              <div className="settings-item font-item">
                <button className="font-size-control" onClick={listItem}><MinusIcon className="minus-icon" /></button>
                <span>{TEXTS.TRANSLITERATION}</span>
                <button className="font-size-control" onClick={listItem}><PlusIcon className="plus-icon" /></button>
              </div>
              <div className="settings-item font-item">
                <button className="font-size-control" onClick={listItem}><MinusIcon className="minus-icon" /></button>
                <span>{TEXTS.TRANSLATION}</span>
                <button className="font-size-control" onClick={listItem}><PlusIcon className="plus-icon" /></button>
              </div>
              <div className="settings-item font-item">
                <button className="font-size-control" onClick={listItem}><MinusIcon className="minus-icon" /></button>
                <span>Line Height</span>
                <button className="font-size-control" onClick={listItem}><PlusIcon className="plus-icon" /></button>
              </div>
              <div className="settings-item font-item">
                <button className="settings-reset-button" onClick={resetDisplayOptions}>{TEXTS.RESET}</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default ControlsSettings;