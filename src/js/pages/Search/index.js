/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from 'shabados';
import PageLoader from '../PageLoader';
import Layout, { Stub } from './Layout';

export default class Search extends React.PureComponent {
  static defaultProps = {
    offset: 0,
  };

  static propTypes = {
    q: PropTypes.string.isRequired,
    type: PropTypes.number,
    source: PropTypes.string,
    offset: PropTypes.number,
  };

  render() {
    const { q, type, source, offset } = this.props;

    if (q === '') {
      return (
        <h3>
          <span>Please enter your query in the search bar above</span>
        </h3>
      );
    }

    const url = encodeURI(buildApiUrl({ q, type, source, offset, API_URL }));

    return (
      <PageLoader url={url}>
        {({ loading, data }) =>
          loading ? (
            <Stub />
          ) : (
            <Layout
              totalResults={data.pageinfo.totalresults}
              resultsCount={data.pageinfo.pageresults}
              nextPageOffset={data.pageinfo.nextpageoffset}
              shabads={data.shabads}
              q={q}
              type={type}
              source={source}
            />
          )
        }
      </PageLoader>
    );
  }
}
