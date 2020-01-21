import React from 'react';
import CrossIcon from './Icons/Times';
import cx from 'classnames';
import { saveToLocalStorage, getBooleanFromLocalStorage } from '@/util';

export default class Banner extends React.PureComponent {

  state = {
    title: '',
    message: '',
    toggleBannerVisibilty: false,
    year: 0,
    day: 0,
    month: 0,
  };

  componentDidMount() {
    const d = new Date();
    const $yr = d.getFullYear();
    const $month = d.getMonth();
    const $day = d.getDate();
    this.setState({ year: $yr, day: $day, month: $month })
    fetch(`http://api.sikhitothemax.org/messages/web/${$yr}-${$month}-${$day}`)
      .then(r => r.json())
      .then(messages => {
        const hasSeenMsg = getBooleanFromLocalStorage(`SeenBanner-${this.state.month}/${this.state.day}`, false);
        if (messages.rows.length === 0 || hasSeenMsg === true) {
          this.setState({ toggleBannerVisibilty: false });
        } else if (
          hasSeenMsg === null || hasSeenMsg === false) {
          this.setState({
            toggleBannerVisibilty: true,
            title: messages.rows[0].Title,
            message: messages.rows[0].Content,
            type: messages.rows[0].Type,
          });
        }
      }
      );
  }

  toggleBanner = () => {
    this.setState({
      toggleBannerVisibilty: !this.state.toggleBannerVisibilty
    })
  }
  setSeenForDay = () => {
    saveToLocalStorage(`SeenBanner-${this.state.month}/${this.state.day}`, true);
  }
  render() {
    const { toggleBannerVisibilty } = this.state;
    const classNames = cx({
      'banner': true,
      'attention': true,
      'toggled': toggleBannerVisibilty
    });
    return (
      <div className={classNames}>
        {
          toggleBannerVisibilty === true && this.state.message &&
          <>
            <div className='banner-text'>
              <text>{this.state.title + ": "}</text>
              <text>{this.state.message}</text>
            </div>
            <button
              type="button"
              className="banner-cross-bg"
              onClick={() => {
                this.toggleBanner();
                this.setSeenForDay();
              }}
            >
              <CrossIcon className="banner-cross" />
            </button>
          </>
        }
      </div>
    );
  }
}
