import { connect } from 'react-redux';

import {
  setFontSize,
  setTranslationLanguages,
  setTransliterationLanguages,
  resetDisplayOptions,
  resetFontOptions,
  toggleDisplayOptions,
  toggleFontOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleUnicodeOption,
  toggleSplitViewOption,
  toggleDarkMode,
} from '@/features/actions';

import { IStore } from '@/features/types';

import Controls, { IControlsProps, supportedMedia } from './Controls';

// TODO: Take exactly what we need.
const stateToProps = (state: IStore) => state;

const dispatchToProps = {
  setFontSize,
  setTranslationLanguages,
  setTransliterationLanguages,
  resetDisplayOptions,
  resetFontOptions,
  toggleDisplayOptions,
  toggleFontOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleUnicodeOption,
  toggleSplitViewOption,
  toggleDarkMode,
};

export { IControlsProps, supportedMedia };

// TODO: Connect individual components instead of all controls.
export default connect(
  stateToProps,
  dispatchToProps
)(Controls);
