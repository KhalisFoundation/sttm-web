import React from 'react';
import { connect } from 'react-redux';
import ShabadControls from './ShabadControls';
import ShareButtons from './ShareButtons';
import {
  setFontSize,
  setTranslationLanguages,
  setTransliterationLanguages,
  toggleDisplayOptions,
  toggleFontOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleUnicodeOption,
  toggleSplitViewOption,
} from '../features/actions';

function Controls(props) {
  return (
    <div id="controls-wrapper" className="no-select">
      <ShareButtons />
      <ShabadControls {...props} />
    </div>
  );
}

// TODO: Take exactly what we need.
const stateToProps = state => state;

const dispatchToProps = {
  setFontSize,
  setTranslationLanguages,
  setTransliterationLanguages,
  toggleDisplayOptions,
  toggleFontOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleUnicodeOption,
  toggleSplitViewOption,
};

// TODO: Connect individual components instead of all controls.
export default connect(stateToProps, dispatchToProps)(Controls);
