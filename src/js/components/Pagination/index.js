import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Page extends React.PureComponent {
  static propTypes = {
    page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    active: PropTypes.bool,
  };

  render() {
    const { page, active, ...rest } = this.props;
    return (
      <div
        className={cx('searchPaginationItem', {
          searchPaginationItemActive: active,
        })}
        {...rest}
      >
        {page}
      </div>
    );
  }
}

export default class Pagination extends React.PureComponent {
  static defaultProps = {
    maxPages: 10,
    minPagesBeforeCurrent: 3,
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

    const pages = _pages.slice(
      Math.max(currentPage - minPagesBeforeCurrent, 0),
      Math.min(currentPage + maxPages - minPagesBeforeCurrent, _pages.length)
    );

    const lastPage = _pages[_pages.length - 1];

    const showEllipsis =
      currentPage + maxPages - minPagesBeforeCurrent - 1 < _pages.length;

    return (
      <div className="searchPagination">
        {currentPage > minPagesBeforeCurrent && (
          <React.Fragment>
            <Page page={1} onClick={() => onPageClick(1)} />
            <Page page="..." />
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
        {showEllipsis && (
          <React.Fragment>
            <Page page="..." />
            <Page page={lastPage} onClick={() => onPageClick(lastPage)} />
          </React.Fragment>
        )}
      </div>
    );
  }
}
