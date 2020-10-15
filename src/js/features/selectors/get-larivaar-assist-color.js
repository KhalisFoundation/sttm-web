import { createSelector } from 'reselect';

import { blendColors, getLarivaarStrengthPercentage } from '@/util';
import {
  TEXT_COLOR,
  DARKMODE_TEXT_COLOR,
  LARIVAAR_ASSIST_COLOR
} from '@/constants';

const getDarkMode = state => state.darkMode;
const getLarivaarAssistStrength = state => state.larivaarAssistStrength;

export const getLarivaarAssistColor = createSelector(
  [getDarkMode, getLarivaarAssistStrength],
  (darkMode, larivaarAssistStrength) => {
    const akharColor = blendColors(
      darkMode ? DARKMODE_TEXT_COLOR : TEXT_COLOR,
      LARIVAAR_ASSIST_COLOR,
      getLarivaarStrengthPercentage(larivaarAssistStrength)
    )

    return akharColor
  }
)
