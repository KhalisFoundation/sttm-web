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

interface IObserversMap {
  [key: number]: IntersectionObserver | typeof undefined;
}

const observersMap: IObserversMap = {};

const Ang: React.FC<IAngProps> = ({
  ang,
  source,
  highlight,
}) => {
  const url = buildApiUrl({ ang, source, API_URL });
  const history = useHistory();
  const { isFetchingAngData, errorFetchingAngData, angsDataMap } = useFetchAngData(ang, url);

  const changeAngInView = (observedPanktis: IntersectionObserverEntry[]) => {
    observedPanktis.forEach(observedPankti => {
      const { target: targetPankti } = observedPankti;

      const observedPanktiOffsetY = window.scrollY + observedPankti.boundingClientRect.y;
      // It's y position for window bottom => windowTop + currenViewPortHeight.
      const windowBottomOffsetY = window.scrollY + window.innerHeight;

      const isScrolledUpObservedPankti = windowBottomOffsetY > observedPanktiOffsetY;
      const isScrolledDownObservedPankti = windowBottomOffsetY <= observedPanktiOffsetY;

      const observedAng = Number(targetPankti.getAttribute('data-ang'));

      const urlQueryParams = new URLSearchParams(location.search);
      const highlight = urlQueryParams.get('highlight');

      if (isScrolledUpObservedPankti) {
        if (observedPankti.isIntersecting &&
          observedPankti.intersectionRatio === 1) {
          const newUrl = toAngURL({ ang: observedAng + 1, source, highlight: undefined });

          console.log(newUrl, "NEW URLS")
          // We are on currently loaded ang, so we need to load new ang
          history.push(newUrl);
        }
      }

      if (isScrolledDownObservedPankti) {
        if (!observedPankti.isIntersecting &&
          observedPankti.intersectionRatio === 0) {
          const newUrl = toAngURL({ ang: observedAng, source, highlight: undefined });

          console.log(newUrl, 'NEW URLS')
          // We are on currently are on observed ang, so load that
          history.push(newUrl);
        }
      }
    })
  }

  const changeHighlightedPankti = ({ ang, source, highlight, angsDataMap }) => (e) => {
    if (highlight) {
      const angData = angsDataMap[ang];
      if (e.key === 'ArrowDown') {
        const nextHighlightVerse = highlight + 1;
        const isLastVerseOfCurrentPage = highlight === angData.page[angData.page.length - 1].verseId;
        // console.log(isLastverseOfCurrentPage, 'isLastVerseOfCurrentPage');
        // If it's last verse we need to load next page

        const newUrl = toAngURL({
          ang: isLastVerseOfCurrentPage ? (ang + 1) : ang,
          source,
          highlight: isLastVerseOfCurrentPage ? highlight : nextHighlightVerse
        });

        history.push(newUrl);
      }

      if (e.key === 'ArrowUp') {
        const nextHighlightVerse = highlight - 1;
        const isFirstVerseOfCurrentPage = highlight === angData.page[0].verseId;

        //If it's first verse of current page, we need to load the previous page;
        const newUrl = toAngURL({
          ang: isFirstVerseOfCurrentPage ? (ang - 1) : ang,
          source,
          highlight: isFirstVerseOfCurrentPage ? highlight : nextHighlightVerse
        });

        history.push(newUrl);
      }
    }
  }


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const lastPanktis = Array.from(document.querySelectorAll('[data-last-paragraph="true"]'));
      // lastPanktis.forEach(lastPankti => {
      const lastPankti = lastPanktis[lastPanktis.length - 1];
      const lastPanktiAngValue = Number(lastPankti.getAttribute('data-ang'));

      if (!observersMap[lastPanktiAngValue]) {
        const lastPanktiObserver = new IntersectionObserver(changeAngInView, {
          rootMargin: '0px',
          threshold: [0, 1],
        });
        lastPanktiObserver.observe(lastPankti);
        observersMap[lastPanktiAngValue] = lastPanktiObserver;
      }
      // })
    }, 0);

    return () => {
      clearTimeout(timeoutId);

      // Object.values(observersMap).forEach(observer => {
      //   if (observer) {
      //     observer.disconnect();
      //   }
      // })

      // Object.keys(observersMap).forEach((angStr: string) => {
      //   const ang = Number(angStr);
      //   observersMap[ang] = undefined;
      // })
    };
  }, [angsDataMap[ang]])

  useEffect(() => {
    const changeHighlightedPanktiHandler = changeHighlightedPankti({ ang, source, highlight, angsDataMap });
    document.addEventListener('keydown', changeHighlightedPanktiHandler);

    return () => document.removeEventListener('keydown', changeHighlightedPanktiHandler);
  }, [ang, source, highlight, angsDataMap])

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
