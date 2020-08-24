/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from '@sttm/banidb';

import PageLoader from '@/pages/PageLoader';
import GenericError, { SachKaur } from '@/components/GenericError';
import { Spinner } from '@/components/Spinner';
import { TEXTS } from '@/constants';
import SearchResultsCollection from './SearchResultsCollection';
export default class SearchPage extends React.PureComponent {
  static defaultProps = {
    offset: 0,
  };

  static propTypes = {
    q: PropTypes.string.isRequired,
    type: PropTypes.number,
    raag: PropTypes.number,
    writer: PropTypes.number,
    source: PropTypes.string,
    offset: PropTypes.number,
  };

  render() {
    const { q, type, source, offset, raag, writer } = this.props;

    if (q === '') {
      return (
        <GenericError
          title={TEXTS.EMPTY_QUERY}
          description={TEXTS.EMPTY_QUERY_DESCRIPTION}
          image={SachKaur}
        />
      );
    }

    const url = encodeURI(buildApiUrl({ q, type, source, raag, writer, offset, API_URL }));

    return (
      <PageLoader url={url}>
        {({ loading, data }) => {
          if (loading || data === undefined) return <Spinner />;

          const { resultsInfo, verses } = data;

          return (
            <SearchResultsCollection
              pages={Array.from(
                Array(
                  parseInt(
                    resultsInfo.pages.totalPages
                  )
                ),
                (_, i) => i + 1
              )}
              totalResults={resultsInfo.totalResults || 0}
              resultsCount={resultsInfo.pageResults || 0}
              offset={offset}
              //nextPageOffset={resultsInfo.pages.page}
              shabads={verses}
              q={q}
              type={type}
              raag={raag}
              writer={writer}
              source={source}
            />
          );
        }}
      </PageLoader>
    );
  }
}
