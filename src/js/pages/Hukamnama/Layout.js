import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TEXTS, FIRST_HUKAMNAMA_DATE } from '../../constants';
import { pageView } from '../../util/analytics';
import ShabadContent from '../../components/ShabadContent';
import BreadCrumb from '../../components/Breadcrumb';
import { dateMath } from '../../util/index';
import GenericError, { BalpreetSingh } from '../../components/GenericError';

export const Stub = () => <div className="spinner" />;

export default class Layout extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  state = {
    error: false,
  };

  constructor(props) {
    super(props);
    this.state = { error: this.props.data.error };
  }

  render() {
    const { data } = this.props;
    let expandedDate, shabad, navigation;
    if (!this.state.error) {
      const { shabads } = data;
      const { date, month, year } = data.date.gregorian;
      const dateFormat = 'YYYY/M/DD';
      const hukamnamaDate = dateMath(
        year + '/' + month + '/' + date,
        dateFormat
      );
      expandedDate = hukamnamaDate.changeFormat('DD-MMM-YYYY');
      let totalVerses = [];

      shabads.forEach(s => {
        totalVerses = totalVerses.concat(s.verses);
      });
      shabad = shabads[0];
      shabad.verses = totalVerses;

      let prevDate = hukamnamaDate.subtract(1, 'd');

      if (hukamnamaDate.isBefore(FIRST_HUKAMNAMA_DATE)) {
        prevDate = undefined;
      }

      //TODO: After API is updated, check if it's latest hukamnama and
      //      set nextDate to undefined

      const nextDate = hukamnamaDate.add(2, 'd');

      navigation = {
        previous: prevDate,
        next: nextDate,
      };
    }

    return this.state.error ? (
      <GenericError
        title={data.data.errorDescription}
        description={
          <React.Fragment>
            {TEXTS.HUKAMNAMA_NOT_FOUND_DESCRIPTION}{' '}
            <Link to="/hukamnama">
              Click here to go back to recent hukamnama.
            </Link>
          </React.Fragment>
        }
        image={BalpreetSingh}
      />
    ) : (
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
