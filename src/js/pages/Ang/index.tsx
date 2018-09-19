/* globals API_URL */
import React from 'react';
import { buildApiUrl, SOURCES } from '@sttm/banidb';
import PageLoader from '@/pages/PageLoader';
import AngLayout, { Stub } from './Ang';

export default class Ang extends React.PureComponent<{
  ang: number;
  source: keyof SOURCES;
  highlight?: number;
}> {
  public render() {
    const { ang, source, highlight } = this.props;
    const url = buildApiUrl({ ang, source, API_URL });

    return (
      <PageLoader url={url}>
        {({ loading, data }) =>
          loading ? (
            <Stub />
          ) : (
            <AngLayout
              data={data}
              highlight={highlight}
              ang={ang}
              source={source}
            />
          )
        }
      </PageLoader>
    );
  }
}
