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
    const d = new Date();
    const $mysqlDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ":" + d.getSeconds();
    const $date = $mysqlDate.slice(0, 10);

    this.setState({ mysqlDate: $mysqlDate, date: $date });
    fetch(`//api.sikhitothemax.org/messages/web/${$date}`)
      .then(r => r.json())
      .then(messages => {

        const $index = messages.rows.length;
        this.setState({ index: $index });
        const hasSeenMsg = getBooleanFromLocalStorage(`SeenBanner-${$date}-${$index}`, false);
        const $msgDate = messages.rows[0].Created;

        if (messages.rows.length === 0 || hasSeenMsg === true || $mysqlDate > $msgDate) {
          this.setState({ toggleBannerVisibilty: false });
        } else if (hasSeenMsg === false && $mysqlDate < $msgDate) {
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
