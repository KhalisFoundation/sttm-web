import React from 'react';
import { Fetch } from '../components';
import { throwError } from '../util';

export default function PageLoader({ url, children }) {
  return (
        <Fetch url={url}>{({ data, error, loading, res }) => (
            loading
                ? children({ loading })
                : error
                    ? throwError('Can\'t load page', error)
                    : children({ data })
        )}</Fetch>
  );
}
