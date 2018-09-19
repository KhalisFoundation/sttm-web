import React from 'react';
import Fetch from '@/components/Fetch';
import { throwError } from '@/util';

export type PageLoaderProps = {
  children: (props: { loading: boolean; data: any }) => JSX.Element;
  url: string;
};

export default class PageLoader extends React.PureComponent<PageLoaderProps> {
  public render() {
    const { url, children } = this.props;
    return (
      <Fetch url={url}>
        {({ data, error, loading }) =>
          loading
            ? children({ loading, data })
            : error
              ? throwError("Can't load page", error)
              : children({ loading: false, data })
        }
      </Fetch>
    );
  }
}
