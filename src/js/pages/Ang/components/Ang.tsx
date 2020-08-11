/* globals API_URL */
import React from 'react';
import { Link } from 'react-router-dom';
import { buildApiUrl } from '@sttm/banidb';

import GenericError, { BalpreetSingh } from '@/components/GenericError';
import ShabadContent from '@/components/ShabadContent';
import BreadCrumb from '@/components/Breadcrumb';
import { saveAng, pageView, errorEvent, ACTIONS, toAngURL } from '@/util';
import { SOURCES, TEXTS } from '@/constants';

import { useFetchAngData } from '../hooks/use-fetch-ang-data';

export const Stub = () => <div className="spinner" />;

type Sources = keyof typeof SOURCES;
interface IAngProps {
  ang: number
  source: Sources
  highlight: number
}

const Ang: React.FC<IAngProps> = ({
  ang,
  source,
  highlight
}) => {

  const url = buildApiUrl({ ang, source, API_URL });
  const { isFetchingAngData, errorFetchingAngData, angsDataMap } = useFetchAngData(url);

  if (source === 'G') {
    saveAng(ang);
  }

  if (isFetchingAngData) {
    return <Stub />
  }

  if (errorFetchingAngData) {
    errorEvent({
      action: ACTIONS.ANG_NOT_FOUND,
      label: `ang:${ang},source:${source}`,
    });
    return (
      <GenericError
        title={TEXTS.ANG_NOT_FOUND}
        description={
          <>
            {TEXTS.ANG_NOT_FOUND_DESCRIPTION(ang, SOURCES[source])}
            <Link to="/help#Desktop-i-cant-find-my-shabad.">
              {' '}
              {TEXTS.HELP_SECTION}
            </Link>{' '}
              or
            <Link to="/index"> {TEXTS.INDEX_SECTION}</Link>.
          </>
        }
        image={BalpreetSingh}
      />
    )
  }

  console.log(angsDataMap, isFetchingAngData, errorFetchingAngData, 'angs data')

  if (!angsDataMap[url]) {
    return null;
  }

  return (
    <div className="row" id="content-root">
      <BreadCrumb links={[{ title: TEXTS.URIS.ANG }]} />
      <ShabadContent
        gurbani={angsDataMap[url].page}
        highlight={highlight}
        nav={Array.isArray(angsDataMap[url].navigation) ? {} : angsDataMap[url].navigation}
        info={{ source: angsDataMap[url].source }}
        type="ang"
      />
    </div>
  )
}

export default Ang;
