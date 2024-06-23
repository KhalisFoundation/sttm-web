/* globals API_URL */
import React from 'react';
import {Tooltip as ReactTooltip} from 'react-tooltip';
import { useDispatch } from 'react-redux';
import { getMahankoshTooltipContent } from './util/';
import {
  SET_MAHANKOSH_TOOLTIP_ACTIVE,
} from '@/features/actions';
import { useQuery } from 'react-query';
import { apiClient } from '../FavouriteShabadButton/utils/api-client';

interface Props {
  tooltipId: string;
  gurbaniWord: string;
  clearMahankoshInformation: () => {};
  isFetchingMahankoshExplaination: boolean;
}

const MAHANKOSH_CONFIG = {
  className: 'mahankoshTooltipWrapper',
  openEvents: {
    mouseeenter: false,
    mouseover: false,
    click: true
  },
  closeEvent: {
    mouseleave: true,
    click: true
  }
}

export const MahankoshTooltip = (props: Props) => {
  const dispatch = useDispatch();
  
  const url = props.gurbaniWord ? `${API_URL}kosh/word/${props.gurbaniWord}` : '';

  const { data: mahankoshExplaination, isLoading: isFetchingMahankoshExplaination, isSuccess } = useQuery({
    queryKey: ['mahakosh-shabad', props.gurbaniWord ],
    queryFn: async () => {
      const data = await apiClient(url)
      return data;
    }
  });

  const mahankoshTooltipContent = getMahankoshTooltipContent(props.gurbaniWord, mahankoshExplaination, isFetchingMahankoshExplaination);
  
  if(isFetchingMahankoshExplaination && !isSuccess) {
    return <ReactTooltip
            id={props.tooltipId} 
            {...MAHANKOSH_CONFIG}
          >
           <div>Data is loading please wait</div>
          </ReactTooltip>
  }

  return (
    <ReactTooltip
      {...MAHANKOSH_CONFIG}
      id={props.tooltipId}
      afterShow={() => {
        dispatch({ type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: true })
      }}
      afterHide={() => {
        dispatch({ type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: false })
        props.clearMahankoshInformation()
      }}
      place="top"
    >
      {mahankoshTooltipContent}
    </ReactTooltip>
  )
}
