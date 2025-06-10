/* globals API_URL, GURBANIBOT_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from '@sttm/banidb';
import { SEARCH_TYPES, TEXTS } from '../../constants';
import PageLoader from '../PageLoader';
import GenericError, { SachKaur } from '../../components/GenericError';
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
    writer: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      searchURL: '',
      answer: '',
    };
    this.verseIdList = [];
  }

  setSearchUrl() {
    const { q, type, offset, source } = this.props;
    const isChatBot = type === SEARCH_TYPES.ASK_A_QUESTION;

    if (isChatBot) {
      const processedQuery = [...q.matchAll(/[a-zA-Z0-9 ]/g)].join('');
      const semanticApi = encodeURI(
        `${GURBANIBOT_URL}rephrase/?query=${processedQuery}&count=100`
      );
      try {
        const semanticReq = fetch(semanticApi).then((response) =>
          response.json()
        );
        semanticReq.then((semanticData) => {
          // Get the answer from the first result
          const answer = semanticData.results[0]?.Payload?.rephrased_translation || '';
          this.verseIdList = semanticData.results.flatMap((dataObj) => {
            const { VerseID, SourceID } = dataObj.Payload;
            if (SourceID === source || source === 'all') {
              return VerseID;
            } else {
              return [];
            }
          });

          this.setState({
            searchURL: `${API_URL}search-results/${this.verseIdList.toString()}?page=${offset}`,
            answer,
          });
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('err.message', err.message);
      }
    } else {
      this.setState({
        searchURL: '',
        answer: '',
      });
    }
  }

  componentDidMount() {
    this.setSearchUrl();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.q !== this.props.q ||
      prevProps.source !== this.props.source ||
      prevState.searchURL !== this.state.searchURL ||
      prevProps.offset !== this.props.offset
    ) {
      this.setSearchUrl();
    }
  }

  render() {
    const { q, type, source, offset, writer } = this.props;
    const { answer } = this.state;
    const isChatBot = type === SEARCH_TYPES.ASK_A_QUESTION;
    const url = isChatBot
      ? this.state.searchURL
      : encodeURI(buildApiUrl({ q, type, source, offset, writer, API_URL }));

    if (q === '') {
      return (
        <GenericError
          title={TEXTS.EMPTY_QUERY}
          description={TEXTS.EMPTY_QUERY_DESCRIPTION}
          image={SachKaur}
        />
      );
    }

    return (
      <PageLoader url={url}>
        {({ loading, data }) => {
          if (loading || data === undefined) return <Stub />;

          const { resultsInfo, verses } = data;

          return (
            <Layout
              pages={Array.from(
                Array(parseInt(resultsInfo.pages.totalPages)),
                (_, i) => i + 1
              )}
              totalResults={resultsInfo.totalResults || 0}
              resultsCount={resultsInfo.pageResults || 0}
              offset={offset}
              //nextPageOffset={resultsInfo.pages.page}
              shabads={verses}
              answer={answer}
              q={q}
              type={type}
              source={source}
              writer={writer}
            />
          );
        }}
      </PageLoader>
    );
  }
}
