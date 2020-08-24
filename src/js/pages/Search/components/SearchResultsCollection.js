import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Pagination from '@/components/Pagination';
import Controls from '@/components/Controls';
import GenericError, { SachKaur } from '@/components/GenericError';
import SearchResults from '@/components/SearchResults/SearchResults';
import {
  toShabadURL,
  toSearchURL,
  ACTIONS,
  pageView,
  errorEvent,
  clickEvent,
} from '@/util';
import { TYPES, SOURCES, PLACEHOLDERS, TEXTS } from '@/constants';

class SearchResultsCollection extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    pages: PropTypes.array,
    offset: PropTypes.number,
    ...SearchResults.propTypes,
  };

  render() {
    const {
      pages,
      offset,
      q,
      type,
      source,
      raag,
      writer,
      shabads,
      resultsCount,
      ...props
    } = this.props;

    if (parseInt(resultsCount, 10) === 0) {
      const className = PLACEHOLDERS[type][1] === true ? '' : 'gurbani-font';

      errorEvent({
        action: ACTIONS.NO_RESULTS_FOUND,
        label: `q:${q},source:${source},type:${type}`,
      });

      return (
        <GenericError
          title={
            <React.Fragment>
              {TEXTS.NO_RESULTS_FOUND}{' '}
              <span className={className}>{`"${q}"`}</span>
            </React.Fragment>
          }
          description={
            <React.Fragment>
              {TEXTS.NO_RESULTS_FOUND_DESCRIPTION(SOURCES[source], TYPES[type])}
              <Link to="/help#Desktop-i-cant-find-my-shabad.">
                {' '}
                {TEXTS.HELP_SECTION}
              </Link>
              .
            </React.Fragment>
          }
          image={SachKaur}
        />
      );
    }

    // I'm feeling lucky
    if (parseInt(resultsCount, 10) === 1) {
      const [shabad] = shabads;
      return <Redirect to={toShabadURL({ shabad, q, type, source, raag, writer })} />;
    }

    const currentPage = offset;

    return (
      <div className="row" id="content-root">
        <Controls media={[]} disableSplitView hideAlignOption />
        <SearchResults
          q={q}
          type={type}
          source={source}
          raag={raag}
          writer={writer}
          shabads={shabads}
          {...props}
        />

        <Pagination
          currentPage={currentPage}
          pages={pages}
          onPageClick={this.handlePageClick}
        />
      </div>
    );
  }

  handlePageClick = pageNumber => {
    const { q, type, source, offset, raag, writer } = this.props;

    const currentPage = offset;

    if (pageNumber === currentPage) {
      return;
    }

    clickEvent({ action: TEXTS.OPEN_PAGE, label: pageNumber });
    window.scrollTo(0, 0);
    this.props.history.push(
      toSearchURL({
        query: q,
        type,
        source,
        raag,
        writer,
        offset: pageNumber,
      })
    );
  };

  componentDidMount() {
    const { q: query, type, offset, source, raag, writer } = this.props;
    console.log(raag, writer, "LAYOUT SEARCH>>>>>>>>..")
    pageView(toSearchURL({ query, type, source, offset, raag, writer }));
  }
}

<<<<<<< HEAD:src/js/pages/Search/components/SearchResultsCollection.js
const stateToProps = state => state;
export default connect(stateToProps)(SearchResultsCollection);
=======
const stateToProps = (state) => state;
export default connect(stateToProps)(withRouter(Layout));
>>>>>>> 5364c3d2d3b3d512ff9481846c400d103e7a5ec0:src/js/pages/Search/Layout.js
