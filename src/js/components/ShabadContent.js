import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Controls from './Controls';
import FootNav from './FootNav';
import Meta from './Meta';
import Baani from './Baani';

class Shabad extends React.PureComponent {
  static defaultProps = {
    nav: {}
  };

  static propTypes = {
    gurbani: PropTypes.array.isRequired,
    highlight: PropTypes.number,
    random: PropTypes.bool.isRequired,
    splitView: PropTypes.bool.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
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
      </React.Fragment>
    );
  }
}

const stateToProps = state => state;
export default connect(stateToProps)(Shabad);
