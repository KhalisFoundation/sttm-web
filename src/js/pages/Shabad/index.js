import React from 'react';
import { buildApiUrl } from 'shabados';
import PageLoader from '../PageLoader';
import ShabadContent from '../../components/ShabadContent';

const Stub = () => <div className="spinner" />;

export default function Shabad({ random, id, q, type }) {
  const url = buildApiUrl(typeof random !== 'undefined' ? { random: true } : { id });

  return (
    <PageLoader url={url}>{({ data, loading }) =>
      loading
        ? <Stub />
        : <ShabadContent
          random={random}
          type="shabad"
          info={data.shabadinfo}
          gurbani={data.gurbani}
          nav={data.navigation}
        />
    }</PageLoader>
  );
}
