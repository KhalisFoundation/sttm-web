import React from 'react';
import PropTypes from 'prop-types';
import { LARIVAAR_ASSIST_COLOR } from '@/constants';

export default class Larivaar extends React.PureComponent {
  public static defaultProps = {
    larivaarAssist: false,
    enable: true,
  };

  public static propTypes = {
    larivaarAssist: PropTypes.bool,
    enable: PropTypes.bool,
    children: PropTypes.string.isRequired,
  };

  public render() {
    const { larivaarAssist, enable, children } = this.props;
    const larivaarAssistColor = larivaarAssist ? LARIVAAR_ASSIST_COLOR : '';
    return enable === false
      ? children
      : children.split(' ').map(
          (word, index) =>
            ['॥', ']'].some(v => word.includes(v)) ? (
              `${word} `
            ) : (
              <span
                key={index}
                style={{
                  color: index % 2 === 1 ? larivaarAssistColor : '',
                }}
              >
                {word}
              </span>
            )
        );
  }
}
