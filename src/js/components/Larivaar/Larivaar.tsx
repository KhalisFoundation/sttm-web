import React from 'react';
import PropTypes from 'prop-types';
import { LARIVAAR_ASSIST_COLOR } from '@/constants';

export default class Larivaar extends React.PureComponent {
  static defaultProps = {
    larivaarAssist: false,
    enable: true,
  };

  static propTypes = {
    larivaarAssist: PropTypes.bool,
    enable: PropTypes.bool,
    children: PropTypes.string.isRequired,
  };

  render() {
    const { larivaarAssist, enable, children } = this.props;
    const larivaarAssistColor = larivaarAssist ? LARIVAAR_ASSIST_COLOR : '';
    return (
      <React.Fragment>
        {enable
          ? children.split(' ').map(
              (val, i) =>
                val.indexOf('॥') !== -1 || val.indexOf(']') !== -1 ? (
                  `${val} `
                ) : (
                  <span
                    key={i}
                    style={{ color: i % 2 === 1 ? larivaarAssistColor : '' }}
                  >
                    {val}
                  </span>
                )
            )
          : children}
      </React.Fragment>
    );
  }
}
