import React from 'react';
import PropTypes from 'prop-types';
import {
  LARIVAAR_ASSIST_COLOR,
  HIGHLIGHTED_SEARCH_COLOR,
  NORMAL_SEARCH_COLOR,
} from '../../constants';

export default class Larivaar extends React.PureComponent {
  static defaultProps = {
    larivaarAssist: false,
    enable: true,
  };

  static propTypes = {
    larivaarAssist: PropTypes.bool,
    enable: PropTypes.bool,
    startIndex: PropTypes.number,
    endIndex: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
      .isRequired,
  };

  render() {
    const {
      larivaarAssist,
      enable,
      children,
      startIndex,
      endIndex,
    } = this.props;

    if (enable === false) {
      return children;
    }

    return children.split(' ').map((word, index) => {
      if (['॥', ']'].some(v => word.includes(v))) {
        return `${word} `;
      }

      let color;

      if (!(startIndex !== undefined && endIndex !== undefined)) {
        color = larivaarAssist && index % 2 === 1 ? LARIVAAR_ASSIST_COLOR : '';
      } else {
        color = NORMAL_SEARCH_COLOR;

        if (larivaarAssist && index % 2 === 1) {
          color = LARIVAAR_ASSIST_COLOR;
        }

        if (index >= startIndex && index < endIndex) {
          color = HIGHLIGHTED_SEARCH_COLOR;
        }
      }

      return (
        <span key={index} style={{ color }}>
          {word}
        </span>
      );
    });
  }
}
