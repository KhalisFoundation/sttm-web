/* globals API_URL */
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  highlight,
  ...others
}) => {
  const url = buildApiUrl({ ang, source, API_URL });
  const history = useHistory();
  const { isFetchingAngData, errorFetchingAngData, angsDataMap } = useFetchAngData(url);

  const keyDownHandler = React.useCallback((e) => {
    const angData = angsDataMap[url];
    if (e.key === 'ArrowDown') {
      const nextVerseToHighlight = highlight + 1;
      const isLastVerseOfCurrentPage = highlight === angData.page[angData.page.length - 1].verseId;

      // If it's last verse we need to load next page
      if (isLastVerseOfCurrentPage) {
        history.push(`/ang?ang=${ang + 1}&source=G&highlight=${nextVerseToHighlight}`);
      } else {
        history.push(`/ang?ang=${ang}&source=G&highlight=${nextVerseToHighlight}`);
      }
    }

    if (e.key === 'ArrowUp') {
      const nextVerseToHighlight = highlight - 1;

      const isFirstVerseOfCurrentPage = highlight === angData.page[0].verseId;
      if (isFirstVerseOfCurrentPage) {
        history.push(`/ang?ang=${ang - 1}&source=G&highlight=${nextVerseToHighlight}`);
      } else {
        history.push(`/ang?ang=${ang}&source=G&highlight=${nextVerseToHighlight}`);
      }
    }
  }, [angsDataMap, highlight, url]);

  useEffect(() => {
    // const observer = new new IntersectionObserver(callback, {
    //   threshold
    // });
    // observer.observe(element);
    // const interval = setInterval((ang) => {
    //   history.push(`/ang?ang=${ang + 1}&source=G`)
    // }, 10000, ang);

    // return () => clearInterval(interval);
    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [angsDataMap, url, highlight])

  if (source === 'G') {
    saveAng(ang);
  }

  if (errorFetchingAngData) {
    errorEvent({
      action: ACTIONS.ANG_NOT_FOUND,
      label: `ang: ${ang}, source: ${source}`,
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

  let nav = {};
  let info = { source: '' };
  if (!isFetchingAngData && angsDataMap[url]) {
    console.log(isFetchingAngData, angsDataMap, '...')
    nav = Array.isArray(angsDataMap[url].navigation) ? {} : angsDataMap[url].navigation;
    info = { source: angsDataMap[url].source }
  }

  return (
    <div className="row" id="content-root">
      <BreadCrumb links={[{ title: TEXTS.URIS.ANG }]} />
      <ShabadContent
        type="ang"
        isMultiPage={true}
        isLoadingContent={isFetchingAngData}
        pages={Object.values(angsDataMap)}
        highlight={highlight || 1}
        nav={nav}
        info={info}
      />
    </div>
  )
}

export default Ang;
