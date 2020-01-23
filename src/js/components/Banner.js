/* globals BANNERS_URL */
import React from 'react';

import { saveToLocalStorage, getStringFromLocalStorage } from '@/util';
import { dateMath } from '../util/index.js';
import CrossIcon from './Icons/Times';

export default class Banner extends React.PureComponent {

  state = {
    notifications: [],
    date: 0,
  };

  componentDidMount() {
    const currentDate = new Date();
    const date = currentDate.toISOString().slice(0, 10);

    fetch(`${BANNERS_URL}/${date}`)
      .then(r => r.json())
      .then(messages => {
        const { rows } = messages;

        const unreadNotifications = rows.filter(notification => {
          const { ID } = notification;
          const lastSeen = getStringFromLocalStorage(`banner-${ID}`);

          return dateMath.isAfter(date, lastSeen);
        });

        this.setState({ date, notifications: unreadNotifications });
      }
      );
  }

  updateLastSeen = (e, id) => {
    e.currentTarget.parentElement.remove();
    saveToLocalStorage(`banner-${id}`, this.state.date);
  }

  render() {

    const { notifications } = this.state;

    return (
      <div className="banner attention">
        {notifications.map(notif => {
          return (
            <div key={notif.ID} className={`notification ${notif.Type}`}>
              <div className="banner-text">
                <span className="banner-title">{notif.Title} : </span>
                <span>{notif.Content}</span>
              </div>
              <button className="banner-cross-bg" onClick={(e) => this.updateLastSeen(e, notif.ID)}>
                <CrossIcon className="banner-cross" />
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
