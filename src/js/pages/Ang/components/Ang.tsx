/* globals API_URL */
import React, { useMemo, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { buildApiUrl } from '@sttm/banidb';

import GenericError, { BalpreetSingh } from '@/components/GenericError';
import ShabadContent from '@/components/ShabadContent';
import BreadCrumb from '@/components/Breadcrumb';
import { saveAng, errorEvent, ACTIONS } from '@/util';
import { SOURCES, TEXTS } from '@/constants';

import { useKeydownEventHandler } from '@/hooks';
import { useObserveLastPanktis, useFetchAngData } from '../hooks';
import { changeHighlightedPankti } from '../utils';

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
}) => {
  const url = buildApiUrl({ ang, source, API_URL });
  const history = useHistory();
  const { isFetchingAngData, errorFetchingAngData, angsDataMap } = useFetchAngData(ang, url);
  const angData = angsDataMap[ang];
  const changeHighlightedPanktiHandler = (useCallback(changeHighlightedPankti({
    ang,
    source,
    highlight,
    angData,
    history
  }), [ang, source, highlight, angData, history])) as unknown as EventListener;
  useObserveLastPanktis(source, angData);
  useKeydownEventHandler(changeHighlightedPanktiHandler)

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
  if (!isFetchingAngData && angsDataMap[ang]) {
    nav = Array.isArray(angsDataMap[ang].navigation) ? {} : angsDataMap[ang].navigation;
    info = { source: angsDataMap[ang].source }
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
