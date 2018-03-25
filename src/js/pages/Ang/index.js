/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { buildApiUrl, SOURCES } from 'shabados';
import GenericError, { BalpreetSingh } from '../../components/GenericError';
import { TEXTS } from '../../constants';
import PageLoader from '../PageLoader';
import ShabadContent from '../../components/ShabadContent';

const Stub = () => <div className="spinner" />;

class Layout extends React.PureComponent {
  static propTypes = {
    ang: PropTypes.number,
    source: PropTypes.oneOf(Object.keys(SOURCES)),
    data: PropTypes.object.isRequired,
  };
  render() {
    const { ang, source, data } = this.props;

    if (data.page.length === 0) {
      return (
        <GenericError
          title={TEXTS.ANG_NOT_FOUND}
          description={
            <React.Fragment>
              {TEXTS.ANG_NOT_FOUND_DESCRIPTION(ang, SOURCES[source])}
              <Link to="/help#Desktop-i-cant-find-my-shabad.">
                {' '}
                {TEXTS.HELP_SECTION}.
              </Link>
            </React.Fragment>
          }
          image={BalpreetSingh}
        />
      );
    }

    return (
      <div className="row" id="content-root">
        <ShabadContent
          gurbani={data.page}
          nav={Array.isArray(data.navigation) ? {} : data.navigation}
          info={{ source: data.source }}
          type="ang"
        />
      </div>
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
      <PageLoader url={url}>
        {({ loading, data }) =>
          loading ? <Stub /> : <Layout data={data} ang={ang} source={source} />
        }
      </PageLoader>
    );
  }
}
