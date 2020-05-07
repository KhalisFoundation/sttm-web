import React from 'react';
import PropTypes from 'prop-types';
import BaaniLine from '@/components/BaaniLine';
import { SHABAD_CONTENT_CLASSNAME } from '@/constants';

import { getVerseId, getShabadId } from '@/util/api/shabad';
import HomeIcon from '@/components/Icons/Home';

/**
 *
 *
 * @export
 * @class Baani
 * @extends {React.PureComponent}
 */
export default class Pankti extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      highlightId: props.highlight
    }
  }
  static defaultProps = {
    highlight: null,
  };

  static propTypes = {
    gurbani: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['shabad', 'ang', 'hukamnama', 'sync']).isRequired,
    highlight: PropTypes.number,
    onPanktiClick: PropTypes.func,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    larivaar: PropTypes.bool.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    homeId: PropTypes.number,
    socket: PropTypes.object.isRequired,
  };

  _scrollToHiglight = () => {
    if (this.$highlightedBaaniLine) {
      if ('offsetTop' in this.$highlightedBaaniLine) {
        const { offsetTop, offsetHeight } = this.$highlightedBaaniLine;

        requestAnimationFrame(() =>
          window.scrollTo(0, offsetTop - offsetHeight)
        );
      }
    }
  };

  componentDidMount() {
    const { socket } = this.props;
    this._scrollToHiglight();
    socket.on('data', data => {
      if (data['host'] !== 'sttm-web') {
        !data.homeId && this.setState({ highlightId: data.highlight })
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.highlight !== prevProps.highlight ||
      this.state.highlightId !== prevState.highlightId) {
      this._scrollToHiglight();
    }
  }

  clickedPankti(e, verse, shabad) {
    const clickedPankti = e.currentTarget;

    document.querySelector(".active-slide").classList.remove("active-slide");
    clickedPankti.classList.add("visited", "active-slide");
    this.props.onPanktiClick(verse, shabad);
  }

  baniLineCategory(node, shabad) {
    if (this.state.highlightId === parseInt(getVerseId(shabad), 10)) {
      this.$highlightedBaaniLine = node;
    } else if (this.props.homeId === parseInt(getVerseId(shabad), 10)) {
      this.$homeBaaniLine = node;
    }
  }

  render() {
    const {
      gurbani,
      unicode,
      larivaar,
      larivaarAssist,
      fontSize,
      fontFamily,
      homeId,
    } = this.props;
    const highlight = this.state.highlightId;

    const getBaniLine = shabad => (
      <BaaniLine
        text={shabad.verse}
        unicode={unicode}
        shouldHighlight={highlight === parseInt(getVerseId(shabad), 10)}
        larivaar={larivaar}
        larivaarAssist={larivaarAssist}
        fontSize={fontSize}
        fontFamily={fontFamily}
        visraam={shabad.visraam}
      />
    );

    const markup = gurbani.map(shabad => (
      <div
        key={getVerseId(shabad)}
        id={`line-${getVerseId(shabad)}`}
        className={`line ${highlight === parseInt(getVerseId(shabad), 10) ? 'visited active-slide' : ''}`}
        ref={node => this.baniLineCategory(node, shabad)}
        onClick={e => this.clickedPankti(e, getVerseId(shabad), getShabadId(shabad))}
      >
        {getBaniLine(shabad)}
        {homeId === parseInt(getVerseId(shabad), 10) && (<HomeIcon />)}
      </div>
    ));

    return (
      <React.Fragment>
        <div
          className={`${SHABAD_CONTENT_CLASSNAME}`}
        >
          {markup}
        </div>
        <button className="scroll-to-top home-button"
          onClick={() => {
            window.scrollTo(0, this.$homeBaaniLine.offsetTop - 70);
            this.$homeBaaniLine.click();
          }}>
          <HomeIcon />
        </button>
      </React.Fragment >
    );
  }
}
