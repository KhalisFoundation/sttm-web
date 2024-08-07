import React from 'react';
import Larivaar from './Larivaar';

interface Props {
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
  visraam?: Object,
  isVisraam: boolean,
  isReadingMode?: boolean,
}

const BaaniLine = ({
  larivaar,
  larivaarAssist,
  shouldHighlight,
  fontSize,
  lineHeight,
  fontFamily,
  unicode,
  text,
  visraam,
  isVisraam,
  isReadingMode = false,
}: Props) => {

  if (isReadingMode) {
    return (
      <div
        className={`gurmukhi gurbani-display gurbani-font ${shouldHighlight ? 'highlight' : ''
          } ${larivaar ? 'larivaar' : ''} ${unicode ? 'unicode' : 'gurlipi-reading-mode'}`}
        style={{ fontSize: `${fontSize}em`, fontFamily: `${fontFamily}`, lineHeight: lineHeight + 0.2 }}
      >
        <Larivaar
          isShowMahankoshTooltip
          larivaarAssist={larivaarAssist}
          enable={larivaar}
          unicode={unicode}
          visraam={visraam}
          isVisraam={isVisraam}
        >
          {unicode ? text.unicode : text.gurmukhi}
        </Larivaar>
      </div>
    );
  }

  return (
    <div
      className={`gurmukhi gurbani-display gurbani-font ${shouldHighlight ? 'highlight' : ''
        }`}
      style={{ fontSize: `${fontSize}em`, fontFamily: `${fontFamily}`, lineHeight: lineHeight }}
    >
      {'\n'}
      <div className={`${larivaar ? 'larivaar' : ''} ${unicode ? 'unicode' : 'gurlipi'}`}>
        <Larivaar
          isShowMahankoshTooltip
          larivaarAssist={larivaarAssist}
          enable={larivaar}
          unicode={unicode}
          visraam={visraam}
          isVisraam={isVisraam}
        >
          {unicode ? text.unicode : text.gurmukhi}
        </Larivaar>
      </div>
      {'\n'}
    </div>
  );
}

export default BaaniLine;
