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
import BreadCrumb from '../../components/Breadcrumb';
import { TEXTS } from '../../constants';
const Spinner = () => <div className="spinner" />;


interface Props {
  random: boolean;
  highlight: string | number;
  id: string,
  isVisraam: boolean;  
  isLarivaarAssist: boolean;
}

interface StoreSliceState {
  visraams: boolean, larivaarAssist: boolean
}

const Shabad = (props: Props) => {
  const state = useSelector<StoreSliceState>((state) => ({
    isVisraam: state.visraams, isLarivaarAssist: state.larivaarAssist 
  })); 
  
  const [isHideBanner, setIsHideBanner] = useState<boolean>(false);

  useEffect(() => {
    if (props.random) {
      pageView('/shabad?random');
    } else {
      pageView(toShabadURL({ shabad: { shabadid: `${props.id}`, id: props.highlight } }));
    }
  }, [props.random])

  const url = buildApiUrl(
    props.random ? { random: props.random, API_URL } : { random: props.random, id: Number(props.id), API_URL }
  );
  console.log(state,"STAATE")
  return (
    <PageLoader url={url}>
    {({ data, loading }) =>
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
            />
          )}
        </div>
      )
    }
  </PageLoader>
  )
}

export default Shabad;

