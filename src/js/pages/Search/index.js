/* globals API_URL, GURBANIBOT_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from '@sttm/banidb';
import { SEARCH_TYPES, TEXTS, GURBANIBOT_THRESHOLD } from '../../constants';
import PageLoader from '../PageLoader';
import GenericError, { SachKaur } from '../../components/GenericError';
import Layout, { Stub } from './Layout';
import AskGurbaniBotSearch from '@/components/SearchResults/AskGurbaniBotSearch';
import BreadCrumb from '@/components/Breadcrumb';

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
    autoDetectGurmukhi: PropTypes.bool,
  };

  constructor() {
    super();
    this.state = {
      searchURL: '',
    };
    this.verseIdList = [];
  }

  setSearchUrl() {
    const { q, type, offset, source } = this.props;
    const isChatBot = type === SEARCH_TYPES.ASK_A_QUESTION;

    if (isChatBot) {
      const processedQuery = [...q.matchAll(/[a-zA-Z0-9 ]/g)].join('');
      const semanticApi = encodeURI(
        `${GURBANIBOT_URL}search/?query=${processedQuery}&count=20`
      );
      try {
        const semanticReq = fetch(semanticApi).then((response) =>
          response.json()
        );
        semanticReq.then((semanticData) => {
          this.verseIdList = semanticData.results.flatMap((dataObj) => {
            if (dataObj.Score >= GURBANIBOT_THRESHOLD) {
              return []
            }
            const { VerseID, SourceID } = dataObj.Payload;
            if (SourceID === source || source === 'all') {
              return VerseID;
            } else {
              return [];
            }
          });

          this.verseIdList.length > 0 ? this.setState({
            searchURL: `${API_URL}search-results/${this.verseIdList.toString()}?page=${offset}`,
          }) : this.setState({ searchURL: '' });
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('err.message', err.message);
      }
    } else {
      this.setState({
        searchURL: '',
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
      prevProps.type !== this.props.type ||
      prevProps.offset !== this.props.offset
    ) {
      this.setSearchUrl();
    }
  }

  render() {
    const { q, type, source, offset, writer, autoDetectGurmukhi } = this.props;
    const isChatBot = type === SEARCH_TYPES.ASK_A_QUESTION;

    // Prepare API parameters
    const apiParams = { q, type, source, offset, writer, API_URL };
    // Add isGurmukhi parameter if it's provided and equals "1"
    if (autoDetectGurmukhi) {
      apiParams.isGurmukhi = 1;
    }

    let url = isChatBot ? this.state.searchURL : buildApiUrl(apiParams);

    url = encodeURI(url);

    if (q === '') {
      return (
        <GenericError
          title={TEXTS.EMPTY_QUERY}
          description={TEXTS.EMPTY_QUERY_DESCRIPTION}
          image={SachKaur}
        />
      );
    }

    if (this.state.searchURL === '') {
      return (
        <div className="row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.URIS.SEARCH_RESULTS }]} />
          <AskGurbaniBotSearch query={this.props.q || ''} />
          <Layout
            pages={0}
            totalResults={0}
            resultsCount={0}
            offset={1}
            shabads={[]}
            q={q}
            type={type}
            source={source}
            writer={writer}
            autoDetectGurmukhi={autoDetectGurmukhi}
          />
        </div>
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
              q={q}
              type={type}
              source={source}
              writer={writer}
              autoDetectGurmukhi={autoDetectGurmukhi}
            />
          );
        }}
      </PageLoader>
    );
  }
}
