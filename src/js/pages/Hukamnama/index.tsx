/* globals API_URL */
import React from 'react';
import PageLoader from '../PageLoader';
import Layout, { Stub, IHukamnamaLayoutProps } from './Layout';
import { versesToGurbani } from '@/util';
import { IHukamnamaAPIResponse } from '@/types';
import { shabadInfoMapper } from '@/util/api';

function Hukamnama() {
  const url = `${API_URL}v2/hukamnamas`;

  return (
    <PageLoader url={url}>
      {({ loading, data }) => {
        if (loading) {
          return <Stub />;
        }

        const apiData = data as IHukamnamaAPIResponse;

        const shabad = apiData.shabads[0];

        const layoutData: IHukamnamaLayoutProps['data'] = {
          gurbani: versesToGurbani(shabad.verses.map(v => ({ verse: v }))),
          shabadinfo: shabadInfoMapper(shabad.shabadInfo),
          navigation: {
            previous: String(shabad.navigation.previous),
            next: String(shabad.navigation.next),
          },
          source: shabad.shabadInfo.source.sourceId,
        };

        return <Layout data={layoutData} />;
      }}
    </PageLoader>
  );
}

export default React.memo(Hukamnama);
