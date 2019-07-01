import React from 'react';
import PropTypes from 'prop-types';
import { TEXTS, FIRST_HUKAMNAMA_DATE } from '../../constants';
import { pageView } from '../../util/analytics';
import ShabadContent from '../../components/ShabadContent';
import BreadCrumb from '../../components/Breadcrumb';
import { dateMath, getHukamnama } from '../../util/index';

export const Stub = () => <div className="spinner" />;

export default class Layout extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  render() {
    const { data } = this.props;
    if (data.error) {
      this.setState('error', true);
    }
    const { shabads } = data;
    const { date, month, year } = data.date.gregorian;
    const dateFormat = 'YYYY/M/DD';
    const hukamnamaDate = dateMath(year + '/' + month + '/' + date, dateFormat);
    const expandedDate = hukamnamaDate.changeFormat('DD-MMM-YYYY');
    let totalVerses = [];

    shabads.forEach(s => {
      totalVerses = totalVerses.concat(s.verses);
    });
    const [shabad] = shabads;
    shabad.verses = totalVerses;

    const prevDate = hukamnamaDate.subtract(1, 'd');
    const nextDate = hukamnamaDate.add(2, 'd');

    const lastDate = getHukamnama('today');

    const navigation = {
      previous: prevDate,
      next: hukamnamaDate.isAfter('2019/6/19') ? undefined : nextDate,
    };

    return (
      <div className="row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.HUKAMNAMA + ' ' + expandedDate }]} />
        <ShabadContent
          gurbani={shabad.verses}
          info={shabad.shabadInfo}
          nav={navigation}
          random={false}
          type={'hukamnama'}
          source={shabad.shabadInfo.source}
        />
      </div>
    );
  }
  componentDidMount() {
    pageView('/hukamnama');
  }
}
