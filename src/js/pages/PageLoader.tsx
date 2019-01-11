import React from 'react';
import PropTypes from 'prop-types';
import Fetch, { IFetchProps } from '../components/Fetch';
import { throwError } from '../util';

export interface IPageLoaderProps {
  url: string;
  children: (options: { loading?: boolean; data?: any }) => React.ReactNode;
}

export default class PageLoader extends React.PureComponent<IPageLoaderProps> {
  public render() {
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
