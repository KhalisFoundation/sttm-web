import React from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends React.PureComponent {
  public static defaultProps = {
    percent: 0,
  };
  public static propTypes = {
    percent: PropTypes.number,
  };

  public render() {
    return (
      <div id="progressbar-root">
        <div
          className="progressbar"
          style={{
            transform: `scaleX(${this.props.percent}) translateZ(0)`,
            transformOrigin: '0 0',
          }}
        />
      </div>
    );
  }
}
