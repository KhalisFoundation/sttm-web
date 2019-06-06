import React from 'react';
import PropTypes from 'prop-types';
import { TEXTS } from '../../constants';
import { pageView } from '../../util/analytics';
import ShabadContent from '../../components/ShabadContent';
import BreadCrumb from '../../components/Breadcrumb';

export const Stub = () => <div className="spinner" />;

export default class Layout extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  render() {
    const { data } = this.props;
    const shabads = [];
    const { date, month, year } = data.date.gregorian;
    const dateString = date + '-' + month + '-' + year;
    data.shabads.forEach(shabad => {
      shabads.push(
        <ShabadContent
          gurbani={shabad.verses}
          info={shabad.shabadInfo}
          nav={shabad.navigation}
          random={false}
          type={'hukamnama'}
          source={shabad.shabadInfo.source}
        />
      );
    });

    return (
      <div className="row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.HUKAMNAMA + ' ' + dateString }]} />
        {shabads}
      </div>
    );
  }
  componentDidMount() {
    pageView('/hukamnama');
  }
}
