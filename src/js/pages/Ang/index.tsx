/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from '@sttm/banidb';
import PageLoader from '@/pages/PageLoader';
import Layout, { Stub } from './Layout';

export default class Ang extends React.PureComponent {
  static propTypes = {
    ang: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    highlight: PropTypes.number,
  };
  render() {
    const { ang, source, highlight } = this.props;
    const url = buildApiUrl({ ang, source, API_URL });

    return (
      <PageLoader url={url}>
        {({ loading, data }) =>
          loading ? (
            <Stub />
          ) : (
            <Layout
              data={data}
              highlight={highlight}
              ang={ang}
              source={source}
            />
          )
        }
      </PageLoader>
    );
  }
}
