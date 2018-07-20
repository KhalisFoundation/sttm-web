import React from 'react';
import PropTypes from 'prop-types';
import Fetch from '@/components/Fetch';
import { throwError } from '@/util';
export default class PageLoader extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  };
  render() {
    const { url, children } = this.props;
    return (
      <Fetch url={url}>
        {({ data, error, loading }) =>
          loading
            ? children({ loading })
            : error
              ? throwError("Can't load page", error)
              : children({ data })
        }
      </Fetch>
    );
  }
}
