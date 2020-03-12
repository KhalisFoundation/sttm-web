/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from '@sttm/banidb';
import { TEXTS } from '../../constants';
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
  static defaultProps = {
    offset: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      offset: props.offset,
      shabadId: null,
      verseId: null,
      openShabad: false,
    }
  }

  static propTypes = {
    q: PropTypes.string.isRequired,
    type: PropTypes.number,
    source: PropTypes.string,
    offset: PropTypes.number,
    socket: PropTypes.object,
    controllerPin: PropTypes.number,
  };

  handlePageClick = e => {
    this.setState({ offset: e });
  }

  onShabadClick = (shabadId, verseId, gurmukhi) => {
    const prevSlide = document.querySelector(".active-slide");
    prevSlide && prevSlide.classList.remove("active-slide");

    this.props.socket.emit('data', {
      host: "sttm-web",
      type: "shabad",
      pin: this.props.controllerPin,
      shabadId,
      verseId,
      gurmukhi,
    });
    this.setState({ verseId, shabadId, openShabad: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ openShabad: false, shabadId: null, verseId: null });
    }
  }

  render() {
    const { q, type, source } = this.props;
    const { offset } = this.state;

    if (q === '') {
      return (
        <GenericError
          title={TEXTS.EMPTY_QUERY}
          description={TEXTS.EMPTY_QUERY_DESCRIPTION}
          image={SachKaur}
        />
      );
    }

    const url = this.state.openShabad ? buildApiUrl({ id: this.state.shabadId, API_URL })
      : encodeURI(buildApiUrl({ q, type, source, offset, API_URL }));

    return (
      <PageLoader url={url}>
        {({ loading, data }) => {
          if (loading || data === undefined) return <Stub />;

          if (!this.state.openShabad && data.resultsInfo) {
            const { resultsInfo, verses } = data;

            const results = [];

            verses.map(shabad => {
              const highlightIndex = getHighlightIndices(
                shabad.verse.gurmukhi,
                q,
                type
              );

              results.push(
                <li className="search-result" key={shabad.verseId}
                  onClick={() => { this.onShabadClick(getShabadId(shabad), getVerseId(shabad), getGurmukhiVerse(shabad)); }}>
                  <Larivaar
                    key={shabad.id}
                    larivaarAssist={false}
                    enable={false}
                    unicode={false}
                    highlightIndex={highlightIndex}
                    query={q}
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
                    Array(
                      parseInt(
                        resultsInfo.pages.totalPages
                      )
                    ),
                    (_, i) => i + 1
                  )}
                  onPageClick={this.handlePageClick}
                />
              </React.Fragment>
            );
          } else {
            return (
              <ControllerShabad data={data}
                socket={this.props.socket}
                highlight={this.state.verseId}
                controllerPin={this.props.controllerPin} />
            )
          }
        }}
      </PageLoader>
    );
  }
}
