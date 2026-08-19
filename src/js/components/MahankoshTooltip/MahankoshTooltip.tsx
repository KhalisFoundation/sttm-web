/* globals API_URL */
import React from 'react';
import {Tooltip as ReactTooltip} from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { getMahankoshTooltipContent } from './util/';
import {
  SET_MAHANKOSH_TOOLTIP_ACTIVE,
} from '@/features/actions';
import { useQuery } from 'react-query';
import { apiClient } from '../FavouriteShabadButton/utils/api-client';
import { getMahankoshTooltipEvents } from './get-mahankosh-tooltip-events';

interface Props {
  tooltipId: string;
  gurbaniWord: string;
  clearMahankoshInformation: () => {};
  isMahankoshTooltipActive: boolean;
  gurbaniLineInfo: any;
  wordIndex: number;
}

const MAHANKOSH_CONFIG = {
  className: 'mahankoshTooltipWrapper',
  openEvents: {
    mouseover: false,
    mouseenter: false,
    click: true
  },
}

export const MahankoshTooltip = (props: Props) => {
  const dispatch = useDispatch();
  const isAutoScrolling = useSelector((state: { isAutoScrolling?: boolean }) => !!state.isAutoScrolling);
  const tooltipEvents = getMahankoshTooltipEvents(isAutoScrolling);
  
  const gurbaniLine: string = props.gurbaniWord ? props.gurbaniLineInfo[0].verse.unicode : '';
  const gurbaniQuery: string = props.gurbaniWord ? gurbaniLine.split(' ')[props.wordIndex] : '';
  const url = props.gurbaniWord ? `${API_URL}kosh/word/${gurbaniQuery}` : '';

  const { data: mahankoshExplaination, isLoading: isFetchingMahankoshExplaination, isSuccess } = useQuery({
    queryKey: ['mahakosh-shabad', props.gurbaniWord ],
    queryFn: async () => {
      const data = await apiClient(url)
      return data;
    }
  });

  const mahankoshTooltipContent = getMahankoshTooltipContent(props.gurbaniWord, mahankoshExplaination, isFetchingMahankoshExplaination);
  
  return (
    <ReactTooltip
      {...MAHANKOSH_CONFIG}
      {...tooltipEvents}
      id={props.tooltipId}
      isOpen={props.isMahankoshTooltipActive}
      afterHide={() => {
        dispatch({type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: false})
      }}
      delayShow={200}
      place="top"
    >
      {isFetchingMahankoshExplaination && !isSuccess ? <div>Data is loading please wait.</div> : mahankoshTooltipContent}
    </ReactTooltip>
  )
}
