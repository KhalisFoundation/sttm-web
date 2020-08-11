/* globals API_URL */
import React from 'react';
import { buildApiUrl } from '@sttm/banidb';

import PageLoader from '../../PageLoader';
import Layout, { Stub } from './Layout';
import { saveAng } from '@/util';
import { SOURCES } from '@/constants';

type Sources = keyof typeof SOURCES;
interface IAngProps {
  ang: number
  source: Sources
  highlight: number
}

export default class Ang extends React.PureComponent<IAngProps> {

  render() {
    const { ang, source, highlight } = this.props;
    const url = buildApiUrl({ ang, source, API_URL });

    source === 'G' && saveAng(ang);

    return (
      <PageLoader url={url}>
        {({ loading, data }: { loading: boolean, data: any }) =>
          loading ? (
            <Stub />
          ) : (
              <Layout
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
