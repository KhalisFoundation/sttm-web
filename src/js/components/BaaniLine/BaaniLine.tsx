import React from 'react';
import Larivaar from '@/components/Larivaar';
import { Store } from '@/features/types';

type BaaniLineProps = Store & {
  shouldHighlight: boolean;
  text: {
    unicode: string;
    gurmukhi: string;
  };
};

export default class BaaniLine extends React.PureComponent<BaaniLineProps> {
  public render() {
    const {
      larivaar,
      larivaarAssist,
      shouldHighlight,
      fontSize,
      unicode,
      text,
    } = this.props;

    return (
      <div
        className={`gurmukhi ${
          shouldHighlight ? 'highlight' : ''
        } gurbani-display gurbani-font`}
        style={{ fontSize: `${fontSize}em` }}
      >
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
      </div>
    );
  }
}
