/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from 'shabados';
import PageLoader from '../PageLoader';
import ShabadContent from '../../components/ShabadContent';

const Stub = () => <div className="spinner" />;

class Layout extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <ShabadContent
          gurbani={data.page}
          nav={data.navigation}
          info={{ source: data.source }}
          type="ang"
        />
      </React.Fragment>
    );
  }
}

export default class Ang extends React.PureComponent {
  static propTypes = {
    ang: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
  };
  render() {
    const { ang, source } = this.props;
    const url = buildApiUrl({ ang, source, API_URL });

    return (
      <PageLoader url={url}>{({ loading, data }) => (
        loading
          ? <Stub />
          : <Layout data={data} />
      )}</PageLoader>
    );
  }
}