import React from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends React.PureComponent {
  static defaultProps = {
    percent: 0,
  };
  static propTypes = {
    percent: PropTypes.number,
  };

  constructor(props) {
    super(props)
    this.state = {
      percent: 0
    }
  }

  scrollListener = () => {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const maxY =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const percent = parseFloat((y / maxY).toPrecision(2));
      this.setState({ percent });
    });
  };

  componentDidMount() {
    addEventListener('scroll', this.scrollListener, { passive: true });
    this.scrollListener();
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.scrollListener);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.percent !== this.props.percent) {
      this.setState({ percent: this.props.percent });
    }
  }
  render() {
    const {
      percent
    } = this.state;

    return (
      <div id="progressbar-root">
        <div
          className="progressbar"
          style={{
            transform: `scaleX(${percent}) translateZ(0)`,
            transformOrigin: '0 0',
          }}
        />
      </div>
    );
  }
}
