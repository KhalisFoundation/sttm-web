/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from 'shabados';
import PageLoader from '../PageLoader';
import ShabadContent from '../../components/ShabadContent';

const Stub = () => <div className="spinner" />;

export default class Shabad extends React.PureComponent {
  static propTypes = {
    random: PropTypes.any, // TODO: Fix a type
    id: PropTypes.string,
  };

  render() {
    const { random, id } = this.props;
    const url = buildApiUrl(typeof random !== 'undefined'
      ? { random: true, API_URL }
      : { id, API_URL }
    );

    return (
      <PageLoader url={url}>{({ data, loading }) =>
        loading
          ? <Stub />
          : <ShabadContent
            random={random}
            type="shabad"
            info={data.shabadinfo}
            gurbani={data.gurbani}
            nav={data.navigation}
          />
      }</PageLoader>
    );
  }
}