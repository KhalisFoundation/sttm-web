import React, { useState } from 'react';
import Larivaar from './Larivaar';

interface IBaaniLineProps {
  text: {
    unicode: string,
    gurmukhi: string,
  },
  larivaarAssist: boolean,
  shouldHighlight: boolean,
  larivaar: boolean,
  unicode: boolean,
  fontSize: number,
  fontFamily: string,
  lineHeight?: number,
  visraam?: object,
};

const BaaniLine: React.FC<IBaaniLineProps> = ({
  larivaar,
  larivaarAssist,
  shouldHighlight,
  fontSize,
  lineHeight,
  fontFamily,
  unicode,
  text,
  visraam,
}) => {

  return (
    <div
      className={`gurmukhi gurbani-display gurbani-font ${
        shouldHighlight ? 'highlight' : ''
        }`}
      style={{ fontSize: `${fontSize}em`, fontFamily: `${fontFamily}`, lineHeight: lineHeight }}
    >
      {'\n'}
      <div
        className={`${larivaar ? 'larivaar' : ''} ${
          unicode ? 'unicode' : 'gurlipi'
          }`}
      >
        <Larivaar
          setSelectedLineNo={setSelectedLineNo}
          selectedLineNo={selectedLineNo}
          isShowMahankoshTooltip
          larivaarAssist={larivaarAssist}
          enable={larivaar}
          unicode={unicode}
          visraam={visraam}
        >
          {unicode ? text.unicode : text.gurmukhi}
        </Larivaar>
      </div>
      {'\n'}
    </div>
  );;
}

export default BaaniLine;
