import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from 'shabados';
import PageLoader from '../PageLoader';
import Layout, { Stub } from './Layout';
import { redirectTo } from '../../util';

export default class Search extends React.PureComponent {
  static defaultProps = {
    offset: null
  };
  static propTypes = {
    q: PropTypes.string.isRequired,
    type: PropTypes.string,
    source: PropTypes.string,
    offset: PropTypes.string,
  }

  state = {
    offset: this.props.offset
  };

  render() {
    const { q, type, source } = this.props;
    if (q === '') {
      return (
        <h3><span>Please enter your query in the search bar above</span></h3>
      );
    }

    const url = buildApiUrl({ q, type, source, offset: this.state.offset });

    return (
      <React.Fragment>
        <PageLoader url={url}>
          {
            ({ loading, data }) => (
              loading
                ? <Stub />
                : (
                  <Layout
                    totalResults={data.pageinfo.totalresults}
                    resultsCount={data.pageinfo.pageresults}
                    nextPageOffset={data.pageinfo.nextpageoffset}
                    shabads={data.shabads}
                    q={q}
                    type={type}
                    source={source}
                    onLoadMore={this.handleLoadMore}
                  />
                )
            )
          }
        </PageLoader>
      </React.Fragment>
    );
  }

  handleLoadMore = offset => {
    const newUrl = window.location.href
      .replace(/&offset=[\d]+/ig, '')
      .concat(`&offset=${offset}`);

    redirectTo(newUrl);
  }
}