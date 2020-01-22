import React from 'react';
import CrossIcon from './Icons/Times';
import cx from 'classnames';
import { saveToLocalStorage, getBooleanFromLocalStorage } from '@/util';

export default class Banner extends React.PureComponent {

  state = {
    title: '',
    message: '',
    toggleBannerVisibilty: false,
    date: 0,
    mysqlDate: 0,
    index: 0,
  };

  componentDidMount() {
    const $mysqlDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const $date = $mysqlDate.slice(0, 10);
    console.log($date);
    this.setState({ mysqlDate: $mysqlDate, date: $date });
    fetch(`https://api.sikhitothemax.org/messages/web/${$date}`)
      .then(r => r.json())
      .then(messages => {

        const $index = messages.rows.length;
        this.setState({ index: $index });
        const hasSeenMsg = getBooleanFromLocalStorage(`SeenBanner-${$date}-${$index}`, false);
        // const $msgDate = messages.rows[0].Created; || $mysqlDate > $msgDate && $mysqlDate < $msgDate

        if (messages.rows.length === 0 || hasSeenMsg === true) {
          this.setState({ toggleBannerVisibilty: false });
        } else if (hasSeenMsg === false) {
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
    saveToLocalStorage(`SeenBanner-${this.state.date}-${this.state.index}`, true);
  }
  render() {
    const { toggleBannerVisibilty, type } = this.state;
    const classNames = cx({
      'banner': true,
      'attention': true,
      'toggled': toggleBannerVisibilty,
    }, `${type}`);
    return (
      <div className={classNames}>
        {
          toggleBannerVisibilty === true && this.state.message &&
          <>
            <div className='banner-text'>
              <text>{this.state.title.toUpperCase() + ": "}</text>
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
