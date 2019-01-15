import React from 'react';
import Larivaar from '../Larivaar';
import { IStore } from '@/features/types';
import cx from 'classnames';

export interface IBaaniLineProps
  extends Pick<IStore, 'larivaar' | 'unicode' | 'fontSize' | 'larivaarAssist'> {
  text: {
    unicode: string;
    gurmukhi: string;
  };
  className?: string;
  shouldHighlight: boolean;
}

function BaaniLine(props: IBaaniLineProps) {
  const {
    className,
    larivaar,
    larivaarAssist,
    shouldHighlight,
    fontSize,
    unicode,
    text,
  } = props;

  return (
    <div
      className={cx('gurmukhi', 'gurbani-display', 'gurbani-font', className, {
        highlight: shouldHighlight,
      })}
      style={{ fontSize: `${fontSize}em` }}
    >
      {'\n'}
      <div
        className={`${larivaar ? 'larivaar' : ''} ${
          unicode ? 'unicode' : 'gurlipi'
        }`}
      >
        <Larivaar
          larivaarAssist={larivaarAssist}
          enable={larivaar}
          unicode={unicode}
        >
          {unicode ? text.unicode : text.gurmukhi}
        </Larivaar>
      </div>
      {'\n'}
    </div>
  );
}

export default React.memo(BaaniLine);
