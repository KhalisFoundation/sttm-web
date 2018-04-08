import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Controls from './Controls';
import FootNav from './FootNav';
import Meta from './Meta';
import ProgressBar from './ProgressBar';
import Baani from './Baani';

class Shabad extends React.PureComponent {
  state = {
    progress: 0,
  };

  static defaultProps = {
    random: false,
    nav: {},
  };

  static propTypes = {
    gurbani: PropTypes.array.isRequired,
    highlight: PropTypes.number,
    random: PropTypes.bool.isRequired,
    splitView: PropTypes.bool.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['shabad', 'ang', 'hukamnama']).isRequired,
    info: PropTypes.object.isRequired,
    nav: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string,
    }),
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
  };

  render() {
    const {
      gurbani,
      nav,
      info,
      type,
      random,
      splitView,
      translationLanguages,
      transliterationLanguages,
      larivaarAssist,
      larivaar,
      highlight,
      unicode,
      fontSize,
    } = this.props;

    if (random) {
      return <Redirect to={`/shabad?id=${info.id}`} />;
    }

    return (
      <React.Fragment>
        <Controls />
        <Meta info={info} nav={nav} type={type} />
        <div id="shabad" className="shabad display">
          <div className="shabad-container">
            <Baani
              type={type}
              gurbani={gurbani}
              splitView={splitView}
              unicode={unicode}
              highlight={highlight}
              larivaar={larivaar}
              fontSize={fontSize}
              larivaarAssist={larivaarAssist}
              translationLanguages={translationLanguages}
              transliterationLanguages={transliterationLanguages}
            />
            <FootNav info={info} type={type} nav={nav} />
          </div>
        </div>
        <ProgressBar percent={this.state.width} />
      </React.Fragment>
    );
  }

  scrollListener = () => {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const maxY =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const width = y / maxY;
      this.setState({ width });
    });
  };

  componentDidMount() {
    addEventListener('scroll', this.scrollListener, { passive: true });
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.scrollListener);
  }
}

const stateToProps = state => state;
export default connect(stateToProps)(Shabad);
