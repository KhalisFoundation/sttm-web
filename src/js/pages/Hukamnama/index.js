/* globals API_URL */
import React from 'react';
//import { buildApiUrl } from '@sttm/banidb';
import PageLoader from '../PageLoader';
import Layout, { Stub } from './Layout';

export default class Hukamnama extends React.PureComponent {
  render() {
    const url = `${API_URL}hukamnamas`;

    return (
      <PageLoader url={url}>
        {({ loading, data }) => (loading ? <Stub /> : <Layout data={data} />)}
      </PageLoader>
    );
  }
}
