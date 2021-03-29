import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import ControlsSettings from "../components/ControlsSettings/ControlsSettings";

import ShareButtons, { supportedMedia as _s } from './ShareButtons';
import {
  setSgBaaniLength,
  setFontSize,
  setTranslationFontSize,
  setTransliterationFontSize,
  setLineHeight,
  setTranslationLanguages,
  setSteekLanguages,
  setTransliterationLanguages,
  setLarivaarAssistStrength,
  resetDisplayOptions,
  resetFontOptions,
  toggleAdvancedOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleSettingsPanel,
  toggleSplitViewOption,
  toggleDarkMode,
  toggleSehajPaathMode,
  toggleAutoScrollMode,
  toggleParagraphMode,
  toggleVisraams,
  setVisraamSource,
  setVisraamStyle,
  changeFont,
  toggleCenterAlignOption,
  setSettingsPanel,
} from '@/features/actions';


export const supportedMedia = _s;

class Controls extends React.Component {
  state = {
    showBorder: false,
    showControls: true
  };

  static propTypes = {
    showSettingsPanel: PropTypes.bool,
  };

  componentDidMount() {
    this.isChangeInControls = false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showAdvancedOptions !== this.props.showAdvancedOptions) {
      this.isChangeInControls = true;
    }    
  }

  render() {
    const { showBorder, showControls } = this.state;
    const classNames = cx({
      'no-select': true,
      'with-border': showBorder,
    });

    const controlStyles = showControls ? { transform: '' } : { transform: 'rotateX(90deg) perspective(500px)' }

    return (
      <>
        <ShareButtons {...this.props} />
        <div
          style={controlStyles}
          id="controls-wrapper"
          className={classNames}
        >
          <div className={`settings-panel ${this.props.showSettingsPanel ? 'settings-show' : 'settings-hide'}`}>
            <ControlsSettings {...this.props} />
          </div>
        </div>
      </>
    );
  }
}

// TODO: Take exactly what we need.
const mapStateToProps = state => state;

const mapDispatchToProps = {
  setFontSize,
  setTranslationFontSize,
  setTransliterationFontSize,
  setTranslationLanguages,
  setTransliterationLanguages,
  setSteekLanguages,
  setLarivaarAssistStrength,
  setSgBaaniLength,
  resetDisplayOptions,
  resetFontOptions,
  toggleAdvancedOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleSettingsPanel,
  toggleSplitViewOption,
  toggleParagraphMode,
  toggleSehajPaathMode,
  toggleDarkMode,
  toggleAutoScrollMode,
  toggleVisraams,
  setLineHeight,
  setVisraamSource,
  setVisraamStyle,
  changeFont,
  toggleCenterAlignOption,
  setSettingsPanel
};

// TODO: Connect individual components instead of all controls.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
