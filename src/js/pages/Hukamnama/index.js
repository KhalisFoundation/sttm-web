import React from 'react';
import { buildApiUrl } from 'shabados';
import { getParameterByName, throwError } from '../../util';
import PageLoader from '../PageLoader';
import ShabadContent from '../../components/ShabadContent';

const Stub = () => <div className="spinner" />;

const Layout = ({ data }) => (
  <div className="body_text">
    <h3 style={{ textAlign: 'center' }}>Daily Hukamnama from Sri Harmandir Sahib, Amritsar</h3>
    <ShabadContent
      gurbani={data.gurbani}
      info={data.shabadinfo}
      nav={data.navigation}
      type={'shabad'}
      source={data.source}
    />
  </div>
);

export default function Ang({ }) {
  const url = buildApiUrl({ hukam: true });

  return (
    <PageLoader url={url}>{({ loading, data }) => (
      loading
        ? <Stub />
        : <Layout data={data} />
    )}</PageLoader>
  );
}
