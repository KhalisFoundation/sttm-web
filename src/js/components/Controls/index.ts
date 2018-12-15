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
  toggleParagraphViewOption,
  toggleDarkMode,
} from '@/features/actions';
import { State } from '@/features/types';
import Controls from './Controls';

const stateToProps = (state: State) => state;

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
  toggleParagraphViewOption,
  toggleDarkMode,
};

export { IControlsProps, supportedMedia } from './Controls';

export default connect(
  stateToProps,
  dispatchToProps
)(Controls);
