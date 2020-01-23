/* globals BANNERS_URL */
import React from 'react';
import CrossIcon from './Icons/Times';
import cx from 'classnames';
import { saveToLocalStorage, getBooleanFromLocalStorage } from '@/util';
import { dateMath } from '../util/index.js';
export default class Banner extends React.PureComponent {

  state = {
    title: '',
    message: '',
    toggleBannerVisibilty: false,
    date: 0,
    index: 0,
  };

  componentDidMount() {
    const d = new Date();
    const $mysqlDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ":" + d.getSeconds();
    const $date = $mysqlDate.slice(0, 10);

    this.setState({ date: $date });
    fetch(`${BANNERS_URL}/${$date}`)
      .then(r => r.json())
      .then(messages => {

        const $index = messages.rows.length;
        const row = messages.rows[0];
        this.setState({ index: $index });
        const hasSeenMsg = getBooleanFromLocalStorage(`SeenBanner-${$date}-${$index}`, false);
        const $msgDateExp = messages.rows[0].length !== 0 ? row.Expires : null;

        if (messages.rows.length === 0 || hasSeenMsg === true || dateMath.isAfter($mysqlDate, $msgDateExp)) {
          this.setState({ toggleBannerVisibilty: false });
        } else if (hasSeenMsg === false && dateMath.isBefore($mysqlDate, $msgDateExp)) {
          this.setState({
            toggleBannerVisibilty: true,
            title: row.Title,
            message: row.Content,
            type: row.Type,
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
    const checkType = toggleBannerVisibilty ? `${type}` : false;
    let classes =
      cx({
        'banner': true,
        'attention': true,
        'toggled': toggleBannerVisibilty,
      }, checkType);
    return (
      <div className={classes}>
        {
          toggleBannerVisibilty === true && this.state.message &&
          <>
            <div className='banner-text'>
              <span className='banner-title'>{this.state.title + ": "}</span>
              <span>{this.state.message}</span>
            </div>
            <button
              role="button"
              aria-label="close"
              className="banner-cross-bg"
              onClick={() => {
                this.toggleBanner();
                this.setSeenForDay();
              }}
            >
              x
            </button>
          </>
        }
      </div>
    );
  }
}
