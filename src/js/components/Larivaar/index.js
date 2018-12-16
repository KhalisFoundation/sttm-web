import React from 'react';
import PropTypes from 'prop-types';
import { LARIVAAR_ASSIST_COLOR } from '../../constants';

export default class Larivaar extends React.PureComponent {
  static defaultProps = {
    larivaarAssist: false,
    enable: true,
  };

  static propTypes = {
    larivaarAssist: PropTypes.bool,
    enable: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
      .isRequired,
  };

  render() {
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
