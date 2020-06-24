/* globals BANIS_API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class SlideControls extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showBorder: false,
      baniList: null,
    };
  }

  static propTypes = {
    socket: PropTypes.object,
    specialHandler: PropTypes.func,
    controllerPin: PropTypes.number,
    default: PropTypes.any,
  };

  sendSlide = e => {
    const activeSlide = e.currentTarget;

    const prevSlide = document.querySelector(".active-slide");
    prevSlide && prevSlide.classList.remove("active-slide");
    activeSlide.classList.add("active-slide");

    if (activeSlide.id === 'anand-slide') {
      this.props.socket.emit('data', {
        host: "sttm-web",
        type: "ceremony",
        ceremonyId: 3,
        verseId: 26106,
        pin: this.props.controllerPin,
      });
      this.props.specialHandler({
        type: 'ceremony',
        id: 3
      });
    } else if (activeSlide.id === 'bani-slide') {
      this.props.specialHandler({
        type: 'bani',
        id: activeSlide.dataset.baniId
      });
    } else {
      const slideText = {
        'waheguru-slide': 'vwihgurU',
        'moolmantra-slide': '<> siq nwmu krqw purKu inrBau inrvYru Akwl mUriq AjUnI sYBM gur pRswid ]',
        'blank-slide': ''
      }

      this.props.socket.emit('data', {
        host: "sttm-web",
        type: "text",
        pin: this.props.controllerPin,
        text: slideText[activeSlide.id],
        isGurmukhi: true,
        isAnnouncement: true,
      });
    }
  }

  setRef = node => (this.$wrapper = node);

  scrollListener = () => {
    if (this.mounted) {
      this.setState({ showBorder: window.scrollY >= this.$wrapper.offsetTop });
    }
  };

  componentDidMount() {
    this.mounted = true;
    fetch(BANIS_API_URL)
      .then(r => r.json())
      .then(baniList =>
        this.setState({ baniList })
      );
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  componentDidUpdate() {
    if (this.props.default === 3) {
      const activeSlide = document.querySelector("#anand-slide");
      activeSlide.classList.add("active-slide");
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('scroll', this.scrollListener, {
      passive: true,
    });
  }

  render() {
    const classNames = cx({
      'control-section': true,
      'with-border': this.state.showBorder,
    });
    const { baniList } = this.state;
    return (
      <>
        <div className={classNames} id="slide-container" ref={this.setRef}>
          <div className="slide-type" id="waheguru-slide" onClick={this.sendSlide}>
            <p className="gurbani-font">vwihgurU</p>
          </div>
          <div className="slide-type" id="moolmantra-slide" onClick={this.sendSlide}>
            <p>Mool Mantra</p>
          </div>
          <div className="slide-type" id="blank-slide" onClick={this.sendSlide}>
            <p>Blank Slide</p>
          </div>
          <div className="slide-type" id="anand-slide" onClick={this.sendSlide}>
            <p>Anand Sahib</p>
          </div>
        </div>
        <div class="sundar-gutka-sidebar">
          <div class="toggle-button">All Banis</div>
          <div class="sg-sidebar sg-hide">
            <h1>Popular Banis</h1>
            <ul>
              {baniList && baniList.map(bl => {
                console.log(bl);
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
}
