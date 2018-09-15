import React from 'react';
import Fetch from '@/components/Fetch';
import { throwError } from '@/util';
import { FetchState } from '@/components/Fetch/Fetch';
export default class PageLoader extends React.PureComponent<{
  url: string;
  children: (s: FetchState) => React.ReactType;
}> {
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
