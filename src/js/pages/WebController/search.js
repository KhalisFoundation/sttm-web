/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from '@sttm/banidb';
import { TEXTS, SEARCH_TYPES } from '../../constants';
import PageLoader from '../PageLoader';

import GenericError, { SachKaur } from '../../components/GenericError';
import Pagination from '../../components/Pagination';
import { Stub } from '../../pages/Search/Layout';
import Larivaar from '../../components/Larivaar';
import { getHighlightIndices } from '../../util';
import ControllerShabad from './shabad';

import {
  getUnicodeVerse,
  getShabadId,
  getVerseId,
  getGurmukhiVerse,
} from '@/util/api/shabad';

export default class ControllerSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      offset: props.searchData.offset || 0,
      shabadId: null,
      verseId: null,
      homeId: null,
      openShabad: false,
    };
  }

  static propTypes = {
    searchData: PropTypes.object,
    socket: PropTypes.object,
    controllerPin: PropTypes.number,
  };

  handlePageClick = (e) => {
    this.setState({ offset: e });
  };

  onShabadClick = (shabadId, verseId, gurmukhi) => {
    const prevSlide = document.querySelector('.active-slide');
    prevSlide && prevSlide.classList.remove('active-slide');

    this.props.socket.emit('data', {
      host: 'sttm-web',
      type: 'shabad',
      pin: this.props.controllerPin,
      shabadId,
      verseId,
      gurmukhi,
    });
    this.setState({ verseId, shabadId, openShabad: true });
  };

  componentDidMount() {
    const { searchData } = this.props;
    if (!searchData.verseChange && searchData.id) {
      this.setState({
        openShabad: true,
        shabadId: searchData.id,
        verseId: searchData.highlight,
        homeId: searchData.homeId,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { searchData } = this.props;
      if (!searchData.verseChange && searchData.id) {
        this.setState({
          openShabad: true,
          shabadId: searchData.id,
          verseId: searchData.highlight,
          homeId: searchData.homeId,
        });
      } else {
        this.setState({
          openShabad: false,
          shabadId: null,
          verseId: null,
          homeId: null,
        });
      }
    }
  }

  render() {
    const { offset, shabadId } = this.state;
    const { searchData } = this.props;
    let url;

    if (shabadId || searchData.id) {
      url = buildApiUrl({ id: this.state.shabadId || searchData.id, API_URL });
    } else {
      const { query, type, source } = searchData;
      if (query === '') {
        return (
          <GenericError
            title={TEXTS.EMPTY_QUERY}
            description={TEXTS.EMPTY_QUERY_DESCRIPTION}
            image={SachKaur}
          />
        );
      }
      const apiParams = { q: query, type, source, offset, API_URL };
      // Add isGurmukhi parameter if Auto Detect with Gurmukhi is enabled
      if (type === SEARCH_TYPES.AUTO_DETECT && searchData.isGurmukhi) {
        apiParams.isGurmukhi = 1;
      }
      url = buildApiUrl(apiParams);

      // For testing: manually append isGurmukhi parameter if needed
      if (type === SEARCH_TYPES.AUTO_DETECT && searchData.isGurmukhi) {
        url += url.includes('?') ? '&isGurmukhi=1' : '?isGurmukhi=1';
      }

      url = encodeURI(url);
    }

    return (
      <PageLoader url={url}>
        {({ loading, data }) => {
          if (loading || data === undefined) return <Stub />;

          if (!this.state.openShabad && data.resultsInfo) {
            const { resultsInfo, verses } = data;
            const { query, type } = this.props.searchData;

            const results = [];

            verses.map((shabad) => {
              const highlightIndex = getHighlightIndices(
                shabad.verse.gurmukhi,
                query,
                type
              );

              results.push(
                <li
                  className="search-result"
                  key={shabad.verseId}
                  onClick={() => {
                    this.onShabadClick(
                      getShabadId(shabad),
                      getVerseId(shabad),
                      getGurmukhiVerse(shabad)
                    );
                  }}
                >
                  <Larivaar
                    key={shabad.id}
                    larivaarAssist={false}
                    enable={false}
                    unicode={false}
                    highlightIndex={highlightIndex}
                    query={query}
                  >
                    {getUnicodeVerse(shabad)}
                  </Larivaar>
                </li>
              );
            });
            return (
              <React.Fragment>
                <ul> {results} </ul>
                <Pagination
                  currentPage={this.state.offset || 1}
                  pages={Array.from(
                    Array(parseInt(resultsInfo.pages.totalPages)),
                    (_, i) => i + 1
                  )}
                  onPageClick={this.handlePageClick}
                />
              </React.Fragment>
            );
          } else {
            return (
              <ControllerShabad
                data={data}
                socket={this.props.socket}
                highlight={this.state.verseId}
                homeId={this.state.homeId || this.state.verseId}
                controllerPin={this.props.controllerPin}
                resultType="shabad"
              />
            );
          }
        }}
      </PageLoader>
    );
  }
}
