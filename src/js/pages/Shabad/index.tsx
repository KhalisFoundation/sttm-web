/* globals API_URL */
import React, { useEffect, useState } from 'react';
import { buildApiUrl } from '@sttm/banidb';
import { useSelector } from 'react-redux';

import PageLoader from '../PageLoader';
import { pageView } from '../../util/analytics';
import ShabadContent from '../../components/ShabadContent';
import Banner from '../../components/Banner/Banner';
import ListOfShabads from '../../components/ShabadContent/ListOfShabads';
import { toShabadURL, isKeyExists } from '../../util';
import { askKhalisAiOnce, stashAnswer, readStashedAnswer } from '../../util/khalis-ai';
import BreadCrumb from '../../components/Breadcrumb';
import { TEXTS, SEARCH_TYPES } from '../../constants';
const Spinner = () => <div className="spinner" />;

// "Ask a Question": push the stashed Khalis AI answer (the rephrased text) into
// the floating dialog. Covers the case where we arrive at a shabad that already
// has a stashed answer; the primary ask flow sets it directly from the turn.
// setRephrasedTranslation also opens the dialog (see Layout.js).
const AiAnswer = () => {
  useEffect(() => {
    const stash = readStashedAnswer();
    if (!stash || !stash.answer) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).setRephrasedTranslation) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).setRephrasedTranslation({
        question: stash.question,
        answer: stash.answer,
      });
    }
  }, []);
  return null;
};

interface Props {
  random: boolean;
  highlight: string | number;
  id: string;
  isVisraam: boolean;
  isLarivaarAssist: boolean;
  q?: string;
  type?: string;
}

interface StoreSliceState {
  visraams: boolean;
  larivaarAssist: boolean;
}

type AiResolve =
  | null
  | 'loading'
  | 'error'
  | { shabadId: string; verseId: string | null };

const Shabad = (props: Props) => {
  const state = useSelector<StoreSliceState>((state: any) => ({
    isVisraam: state.visraams,
    isLarivaarAssist: state.larivaarAssist,
  }));

  const [isHideBanner, setIsHideBanner] = useState<boolean>(false);

  // Ask a Question: the AI picks the shabad. When we arrive at /shabad?type=9
  // with a question but no shabad id, run one turn to resolve which shabad/verse
  // to show (and the answer), then load that shabad below — no search-results
  // page in between.
  const isAsk =
    !!props.type && parseInt(props.type, 10) === SEARCH_TYPES.ASK_A_QUESTION;
  const hasQuery = !!(props.q && props.q.trim());
  const [ai, setAi] = useState<AiResolve>(null);

  useEffect(() => {
    if (!isAsk || !hasQuery || props.id) return;
    let cancelled = false;
    setAi('loading');
    // Open the dialog immediately and stream the AI's progress stages into it.
    const showStage = (stage: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!cancelled && (window as any).setRephrasedTranslation) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).setRephrasedTranslation({ question: props.q, stage });
      }
    };
    showStage('Asking Khalis AI…');
    askKhalisAiOnce(props.q as string, showStage)
      .then((res) => {
        if (cancelled) return;
        if (res && res.selectedShabadId) {
          stashAnswer(props.q as string, res.answer);
          setAi({ shabadId: res.selectedShabadId, verseId: res.groundedVerseId });
          // Show the rephrased answer in the dialog right away.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (!cancelled && (window as any).setRephrasedTranslation) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).setRephrasedTranslation({
              question: props.q,
              answer: res.answer || 'No answer was generated for this question.',
            });
          }
        } else {
          setAi('error');
        }
      })
      .catch(() => {
        if (!cancelled) setAi('error');
      });
    return () => {
      cancelled = true;
    };
  }, [isAsk, hasQuery, props.q, props.id]);

  const resolved = ai && typeof ai === 'object' ? ai : null;
  const shabadId = props.id || (resolved ? resolved.shabadId : '');
  const highlight = props.highlight || (resolved ? resolved.verseId || '' : '');

  useEffect(() => {
    if (props.random) {
      pageView('/shabad?random');
    } else if (shabadId) {
      pageView(
        toShabadURL({
          shabad: { shabadId: `${shabadId}`, verseId: highlight?.toString() },
          q: props.q || '',
          type: props.type,
          source: undefined,
        })
      );
    }
  }, [props.random, shabadId]);

  // Ask flow still resolving the shabad (or it failed) — nothing to load yet.
  if (isAsk && !props.random && !shabadId) {
    if (ai === 'error') {
      return (
        <div className="row" id="content-root">
          <BreadCrumb links={[{ title: TEXTS.URIS.SHABAD }]} />
          <p style={{ padding: '2rem', textAlign: 'center' }}>
            No answer could be generated for this question. Please try rephrasing it.
          </p>
        </div>
      );
    }
    return <Spinner />;
  }

  const url = buildApiUrl(
    props.random
      ? { random: props.random, API_URL }
      : { random: props.random, id: shabadId as unknown as number, API_URL }
  );

  return (
    <PageLoader url={url}>
      {({ data, loading }: { data: any; loading: boolean }) =>
        loading ? (
          <Spinner />
        ) : (
          <div className="row" id="content-root">
            <AiAnswer />
            {state.isVisraam && state.isLarivaarAssist && !isHideBanner && (
              <Banner
                banner={{
                  classes: {
                    notification: 'notification-shabad',
                  },
                  type: '2',
                  message: `Larivaar Assist & Vishraams: Larivaar Assist will be displayed using different colors for words and the vishraams will be
                shown by orange and red flashing icons between words to guide you when to pause.`,
                }}
                onCrossIconClick={() => setIsHideBanner(true)}
              />
            )}
            <BreadCrumb links={[{ title: TEXTS.URIS.SHABAD }]} />
            {isKeyExists(data, 'shabadIds') ? (
              <ListOfShabads
                type="shabad"
                shabads={data.shabads}
                highlights={highlight}
              />
            ) : (
              <ShabadContent
                random={props.random}
                type="shabad"
                highlight={highlight}
                info={data.shabadInfo}
                gurbani={data.verses}
                nav={data.navigation}
                hideAddButton={false}
              />
            )}
          </div>
        )
      }
    </PageLoader>
  );
};

export default Shabad;
