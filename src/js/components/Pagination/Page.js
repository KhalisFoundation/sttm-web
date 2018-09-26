import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Page extends React.PureComponent {
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
