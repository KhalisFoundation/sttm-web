import React from 'react';
import PropTypes from 'prop-types';
import { LARIVAAR_ASSIST_COLOR } from '../../constants';
import { fixLarivaar } from './util';

export default class Larivaar extends React.PureComponent {
  static defaultProps = {
    larivaarAssist: false,
    enable: true,
  };

  static propTypes = {
    larivaarAssist: PropTypes.bool,
    enable: PropTypes.bool,
    unicode: PropTypes.bool,
    children: PropTypes.string.isRequired,
  };

  render() {
    const { larivaarAssist, enable, children, unicode } = this.props;
    const larivaarAssistColor = larivaarAssist ? LARIVAAR_ASSIST_COLOR : '';
    return (
      <React.Fragment>
        {enable
          ? children.split(' ').map((val, indexVal) => {
              if (val.indexOf('॥') !== -1 || val.indexOf(']') !== -1) {
                return `${val} `;
              } else {
                return fixLarivaar(val, unicode, larivaarAssistColor, indexVal);
              }
            })
          : children}
      </React.Fragment>
    );
  }
}
