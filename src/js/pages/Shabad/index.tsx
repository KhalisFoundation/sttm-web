/* globals API_URL, GURBANIBOT_URL */
import React, { useEffect, useState } from 'react';
import { buildApiUrl } from '@sttm/banidb';
import { useSelector } from 'react-redux';

import PageLoader from '../PageLoader';
import { pageView } from '../../util/analytics';
import ShabadContent from '../../components/ShabadContent';
import Banner from '../../components/Banner/Banner';
import ListOfShabads from '../../components/ShabadContent/ListOfShabads';
import { toShabadURL, isKeyExists } from '../../util';
import BreadCrumb from '../../components/Breadcrumb';
import { TEXTS, SEARCH_TYPES } from '../../constants';
const Spinner = () => <div className="spinner" />;


interface Props {
  random: boolean;
  highlight: string | number;
  id: string,
  isVisraam: boolean;
  isLarivaarAssist: boolean;
  q?: string;
  type?: string;
}

interface StoreSliceState {
  visraams: boolean;
  larivaarAssist: boolean;
}

const Shabad = (props: Props) => {
  const state = useSelector<StoreSliceState>((state: any) => ({
    isVisraam: state.visraams, isLarivaarAssist: state.larivaarAssist
  }));

  const [isHideBanner, setIsHideBanner] = useState<boolean>(false);
  const [rephrasedTranslation, setRephrasedTranslation] = useState<string>('');

  useEffect(() => {
    if (props.random) {
      pageView('/shabad?random');
    } else {
      pageView(toShabadURL({
        shabad: { shabadId: `${props.id}`, verseId: props.highlight.toString() },
        q: props.q || '',
        type: props.type,
        source: undefined
      }));
    }
  }, [props.random])

  // Check if this shabad was opened from "Ask a question" search and fetch rephrased translation
  useEffect(() => {
    const isFromAskQuestion = props.type && parseInt(props.type, 10) === SEARCH_TYPES.ASK_A_QUESTION;
    const hasQuery = props.q && props.q.trim() !== '';

    if (isFromAskQuestion && hasQuery) {
      const processedQuery = props.q?.replace(/[^a-zA-Z0-9 ]/g, '') || '';
      const semanticApi = `${GURBANIBOT_URL}rephrase/?query=${processedQuery}&shabad_id=${props.id}`;

      fetch(semanticApi)
        .then((response) => response.json())
        .then((semanticData: any) => {
          const answer = semanticData.rephrased_translation || '';
          setRephrasedTranslation(answer);
        })
        .catch((err) => {
          // Silently fail - don't show any error, just don't display translation
          console.error('Failed to fetch rephrased translation:', err.message);
        });
    }
  }, [props.type, props.q, props.id]);

  const url = buildApiUrl(
    props.random ? { random: props.random, API_URL } : { random: props.random, id: props.id as unknown as number, API_URL }
  );

  return (
    <PageLoader url={url}>
      {({ data, loading }: { data: any; loading: boolean }) =>
        loading ? (
          <Spinner />
        ) : (
          <div className="row" id="content-root">
            {state.isVisraam && state.isLarivaarAssist && !isHideBanner && (
              <Banner
                banner={{
                  classes: {
                    notification: 'notification-shabad',
                  },
                  type: "2",
                  message: `Larivaar Assist & Vishraams: Larivaar Assist will be displayed using different colors for words and the vishraams will be
                shown by orange and red flashing icons between words to guide you when to pause.`
                }}
                onCrossIconClick={() => setIsHideBanner(true)}
              />
            )}
            <BreadCrumb links={[{ title: TEXTS.URIS.SHABAD }]} />
            {isKeyExists(data, 'shabadIds') ? (
              <ListOfShabads
                type="shabad"
                shabads={data.shabads}
                highlights={props.highlight}
              />
            ) : (
              <ShabadContent
                random={props.random}
                type="shabad"
                highlight={props.highlight}
                info={data.shabadInfo}
                gurbani={data.verses}
                nav={data.navigation}
                hideAddButton={false}
                rephrasedTranslation={{question: props.q, answer: rephrasedTranslation}}
                isAskQuestion={props.type && parseInt(props.type, 10) === SEARCH_TYPES.ASK_A_QUESTION}
              />
            )}
          </div>
        )
      }
    </PageLoader>
  )
}

export default Shabad;

