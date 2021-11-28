/* globals API_URL */
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import GenericError, { BalpreetSingh } from '@/components/GenericError';
import ShabadContent from '@/components/ShabadContent';
import BreadCrumb from '@/components/Breadcrumb';
import { saveAng, errorEvent, ACTIONS, isShowSehajPaathModeRoute } from '@/util';
import { SOURCES, TEXTS } from '@/constants';

import { useKeydownEventHandler } from '@/hooks';
import { useFetchAngData } from '../hooks/use-fetch-ang-data';
import { changeHighlightedPankti } from '../utils';

export const Stub = () => <div className="spinner" />;

type Sources = keyof typeof SOURCES
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
  const history = useHistory();
  const location = useLocation();
  const sehajPaathMode = useSelector(state => state.sehajPaathMode);
  const isLoadingAng = useSelector(state => state.isLoadingAng);

  // We keep track whether at this particular url/route can we make sehaj paath functional even if the global state for it is true
  const isSehajPaathModeRoute = isShowSehajPaathModeRoute(location.pathname);
  const isSehajPaathMode = sehajPaathMode && isSehajPaathModeRoute;

  const { errorFetchingAngData, angsDataMap } = useFetchAngData({ ang, source, isSehajPaathMode });
  const angData = angsDataMap[ang];
  const changeHighlightedPanktiHandler = useCallback(changeHighlightedPankti({
    ang,
    source,
    highlight,
    angData,
    history
  }),
    [ang, source, highlight, angData, history]) as unknown as EventListener;
  useKeydownEventHandler(changeHighlightedPanktiHandler)

  // There is not an error, neither loading for ang going on nor there is ang data then it's first time render
  const isInitialRender = !errorFetchingAngData && !isLoadingAng && !angsDataMap[ang];

  if (source === 'G') {
    saveAng(ang);
  }

  // We can't show this spinner on sehaj paath mode, as this makes it looks like a re render
  if (!isSehajPaathMode) {
    if (isLoadingAng || isInitialRender) {
      return <div className="spinner" />
    }
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
            {TEXTS.ANG_NOT_FOUND_DESCRIPTION(ang.toString(), SOURCES[source])}
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
  if (!isLoadingAng && angsDataMap[ang]) {
    nav = Array.isArray(angsDataMap[ang].navigation) ? {} : angsDataMap[ang].navigation;
    info = { source: angsDataMap[ang].source }
  }

  const pages = Object.values(angsDataMap).filter(pageData => !!pageData);
  const gurbani = isSehajPaathMode ? null : angsDataMap[ang].page;

  return (
    <div className="row" id="content-root">
      <BreadCrumb links={[{ title: TEXTS.URIS.ANG }]} />
      <ShabadContent
        type="ang"
        isMultiPage={isSehajPaathMode}
        isLoadingContent={isLoadingAng}
        gurbani={gurbani}
        pages={pages}
        highlight={highlight || 1}
        nav={nav}
        info={info}
      />
    </div>
  )
}

export default React.memo(Ang);
