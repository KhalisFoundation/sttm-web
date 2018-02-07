import React from 'react';
import { buildApiUrl } from 'shabados';
import { getParameterByName, throwError } from '../../util';
import PageLoader from '../PageLoader';
import ShabadConent from '../../components/ShabadContent';

const Stub = () => <div className="spinner" />;

const Layout = ({ data }) => (
  <React.Fragment>
    <ShabadContent
      gurbani={data.page}
      nav={data.navigation}
      info={{ source: data.source }}
      type="ang"
    />
  </React.Fragment>
);

export default function Ang({ ang, source }) {
  const url = buildApiUrl({ ang, source });

  return (
    <PageLoader url={url}>{({ loading, data }) => (
      loading
        ? <Stub />
        : <Layout data={data} />
    )}</PageLoader>
  );
}
