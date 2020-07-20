import React from 'react';
import PropTypes from 'prop-types';
import Chevron from '../../components/Icons/Chevron';
import Page from './Page';

export default class Pagination extends React.PureComponent {
  static defaultProps = {
    maxPages: 10,
    minPagesBeforeCurrent: 5,
  };

  static propTypes = {
    pages: PropTypes.array,
    currentPage: PropTypes.number,
    onPageClick: PropTypes.func,
    minPagesBeforeCurrent: PropTypes.number,
    maxPages: PropTypes.number,
  };

  render() {
    const {
      pages: _pages,
      currentPage,
      minPagesBeforeCurrent,
      maxPages,
      onPageClick,
    } = this.props;

    if (_pages.length < 2) {
      return null;
    }
    const lastPage = _pages[_pages.length - 1];
    const leftPage = Math.max(currentPage - minPagesBeforeCurrent, 0) + 1;
    const rightPage = Math.min(
      currentPage + maxPages - minPagesBeforeCurrent - 1,
      lastPage
    );

    const showLeftEllipsis = leftPage > 1;
    const showRightEllipsis =
      currentPage + maxPages - minPagesBeforeCurrent - 1 < lastPage;


    const leftEllipsisPage = parseInt(leftPage / 2);
    const rightEllipsisPage = rightPage + parseInt((lastPage - rightPage) / 2);

    // Instead of showing all the pages, we show a slice of it around currentPage.
    const pages = _pages.slice(leftPage - 1, rightPage);

    return (
      <div className="searchPaginationWrapper">
        {currentPage === 1 ? (
          <div />
        ) : (
            <button
              onClick={() => onPageClick(currentPage - 1)}
              className="searchPaginationButton">
              <Chevron
                style={{ fontSize: 28 }}
                title="Previous Page"
                role="button"
                direction={Chevron.DIRECTIONS.LEFT}
              />
            </button>
          )}
        <div className="searchPagination">
          {showLeftEllipsis && (
            <React.Fragment>
              <Page page={1} onClick={() => onPageClick(1)} />
              {leftPage !== 2 && (
                <Page
                  title={leftEllipsisPage}
                  page="..."
                  onClick={() => onPageClick(leftEllipsisPage)}
                />
              )}
            </React.Fragment>
          )}
          {pages.map(page => (
            <Page
              key={page}
              active={page === currentPage}
              page={page}
              onClick={() => onPageClick(page)}
            />
          ))}
          {showRightEllipsis && (
            <React.Fragment>
              {rightPage !== lastPage - 1 && (
                <Page
                  title={rightEllipsisPage}
                  page="..."
                  onClick={() => onPageClick(rightEllipsisPage)}
                />
              )}
              <Page page={lastPage} onClick={() => onPageClick(lastPage)} />
            </React.Fragment>
          )}
        </div>
        {currentPage === lastPage ? (
          <div />
        ) : (
            <button
              onClick={() => onPageClick(currentPage + 1)}
              className="searchPaginationButton">
              <Chevron
                style={{ fontSize: 28 }}
                title="Next Page"
                role="button"
                direction={Chevron.DIRECTIONS.RIGHT}
              />
            </button>
          )}
      </div>
    );
  }
}
