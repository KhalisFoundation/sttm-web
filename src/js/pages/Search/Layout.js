import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from '../../components/Pagination';
import { toShabadURL, toSearchURL } from '../../util';
import { TYPES, SOURCES, PLACEHOLDERS, TEXTS } from '../../constants';
import {
  ACTIONS,
  pageView,
  errorEvent,
  clickEvent,
} from '../../util/analytics';
import Controls from '../../components/Controls';
import GenericError, { SachKaur } from '../../components/GenericError';
import SearchResults from '../../components/SearchResults/SearchResults';

export function Stub() {
  return <div className="spinner" />;
}

class Layout extends React.PureComponent {
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
      resultsCount,
      shabads,
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
      return <Redirect to={toShabadURL({ shabad, q, type, source })} />;
    }

    const currentPage = offset + 1;

    return (
      <div className="row" id="content-root">
        <Controls media={[]} disableSplitView hideAlignOption />
        <SearchResults
          q={q}
          type={type}
          source={source}
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
    const { q, type, source, offset } = this.props;

    const currentPage = offset + 1;

    if (pageNumber === currentPage) {
      return;
    }

    clickEvent({ action: TEXTS.OPEN_PAGE, label: pageNumber });
    window.scrollTo(0, 0);
    this.context.router.history.push(
      toSearchURL({
        query: q,
        type,
        source,
        offset: pageNumber - 1,
      })
    );
  };

  componentDidMount() {
    const { q, type, offset, source } = this.props;
    pageView(toSearchURL({ q, type, source, offset }));
  }
}

const stateToProps = state => state;
export default connect(stateToProps)(Layout);
