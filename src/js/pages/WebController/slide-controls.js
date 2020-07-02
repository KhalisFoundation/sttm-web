/* globals BANIS_API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getBaniCategories } from '@/util/api/sundar-gutka';
import { DownArrowIcon } from '@/components/Icons/CustomIcons';

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
    } else if (activeSlide.classList.contains('bani-slide')) {
      document.querySelector('.sg-list-container').classList.toggle('sg-hide');
      this.props.socket.emit('data', {
        host: "sttm-web",
        type: "bani",
        baniId: activeSlide.dataset.baniId,
        pin: this.props.controllerPin,
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
      .then(baniList => {
        this.setState({ baniList });
      });
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

    let baniMarkup;

    if (baniList) {
      const categories = getBaniCategories(baniList);
      const markup = categories.map(c => (
        <div key={"baniCategory" + c.heading} >
          <p className="bani-category">{c.heading}</p>
          {c.banis.map(bani => (
            <li key={"bani" + bani.ID} className="gurbani-font bani-slide"
              data-bani-id={bani.ID} onClick={this.sendSlide}>
              {bani.gurmukhi}
            </li>
          ))}
          <hr />
        </div>
      ))
      baniMarkup = (
        <ul className="sidebar sg-sidebar">
          {markup}
        </ul>
      )
    } else {
      baniMarkup = (
        <ul className="sidebar sg-sidebar">
          <div className="spinner" />
        </ul>
      );
    }

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
        <div className="list-container sg-list-container sg-hide">
          <div className="toggle-button" onClick={() => {
            document.querySelector('.sg-list-container').classList.toggle('sg-hide');
          }}>
            <DownArrowIcon />
            All Banis
          </div>
          {baniMarkup}
        </div>
      </>
    );
  }
}
