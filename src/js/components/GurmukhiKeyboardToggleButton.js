import React from 'react'
import KeyboardIcon from './Icons/Keyboard';
import { TEXTS } from '@/constants';

const GurmukhiKeyboardToggleButton = ({clickHandler, isVisible}) => {
  return <button
    type="button"
    aria-label={TEXTS.TOGGLE_GURMUKHI_KEYBOARD}
    id="gurmukhi-keyboard-toggle"
    className={`gurmukhi-keyboard-toggle ${
      isVisible ? 'active' : ''
      }`}
    onClick={clickHandler(!isVisible)}
  >
    <KeyboardIcon />
  </button>
}

export default GurmukhiKeyboardToggleButton;