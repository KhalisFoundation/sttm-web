import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ControlsSettings from '../components/ControlsSettings/ControlsSettings';

import ShareButtons, { supportedMedia as _s } from './ShareButtons';
import {
  setSgBaaniLength,
  setFontSize,
  setTranslationFontSize,
  setTransliterationFontSize,
  setLineHeight,
  setTranslationLanguages,
  setSteekLanguages,
  setEnglishTranslationLanguages,
  setHindiTranslationLanguages,
  setTransliterationLanguages,
  setLarivaarAssistStrength,
  setSplitView,
  setReadingMode,
  setSehajPaathMode,
  resetDisplayOptions,
  resetFontOptions,
  toggleAdvancedOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleSettingsPanel,
  toggleKeyboardShortcutsPanel,
  toggleSplitViewOption,
  toggleDarkMode,
  toggleSehajPaathMode,
  toggleAutoScrollMode,
  toggleParagraphMode,
  toggleReadingMode,
  toggleVisraams,
  setVisraamSource,
  setVisraamStyle,
  changeFont,
  toggleCenterAlignOption,
  closeSettingsPanel,
  closeMultiViewPanel,
  closePinSettings,
  toggleCartoonifiedPages,
  toggleShabadAudioPlayer
} from '@/features/actions';

export const supportedMedia = _s;

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.setRef = this.setRef.bind(this);
    this.settingsRef = React.createRef();
  }

  state = {
    showBorder: false,
    showControls: true,
  };

  static propTypes = {
    showSettingsPanel: PropTypes.bool,
    showPinSettings: PropTypes.bool,
  };

  setRef = (node) => (this.wrapperRef = node);

  render() {
    const { showSettingsPanel, showPinSettings } = this.props;

    return (
      <>
        <ShareButtons {...this.props} />
        <div
          ref={!showPinSettings && this.settingsRef}
          className={`settings-panel ${
            showSettingsPanel ? 'settings-show' : ''
          }`}
        >
          {showSettingsPanel && (
            <ControlsSettings settingsRef={!showPinSettings && this.settingsRef} {...this.props} />
          )}
        </div>
      </>
    );
  }
}

// TODO: Take exactly what we need.
const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setFontSize,
  setTranslationFontSize,
  setTransliterationFontSize,
  setTranslationLanguages,
  setTransliterationLanguages,
  setSteekLanguages,
  setEnglishTranslationLanguages,
  setHindiTranslationLanguages,
  setLarivaarAssistStrength,
  setSgBaaniLength,
  setSplitView,
  setReadingMode,
  setSehajPaathMode,
  resetDisplayOptions,
  resetFontOptions,
  toggleAdvancedOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleSettingsPanel,
  toggleKeyboardShortcutsPanel,
  toggleSplitViewOption,
  toggleParagraphMode,
  toggleReadingMode,
  toggleSehajPaathMode,
  toggleDarkMode,
  toggleAutoScrollMode,
  toggleVisraams,
  setLineHeight,
  setVisraamSource,
  setVisraamStyle,
  changeFont,
  toggleCenterAlignOption,
  closeSettingsPanel,
  closeMultiViewPanel,
  closePinSettings,
  toggleCartoonifiedPages,
  toggleShabadAudioPlayer
};

// TODO: Connect individual components instead of all controls.
export default connect(mapStateToProps, mapDispatchToProps)(Controls);
