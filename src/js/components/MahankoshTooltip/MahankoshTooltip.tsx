/* eslint-disable react/prop-types */
/* globals API_URL */
import React, { useEffect } from 'react';
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

const mahanKoshConfig = {
  openEvents: {
    hover: false,
    click: true
  },
  closeEvent: {
    mouseLeave: true,
    click: true
  }
}

export const MahankoshTooltip = (props: Props) => {
  const dispatch = useDispatch();
  
  const url = props.gurbaniWord ? `${API_URL}kosh/word/${props.gurbaniWord}` : '';
  // const {
  //   isFetchingData: isFetchingMahankoshExplaination,
  //   data: mahankoshExplaination,
  // } = useFetchData(url);

  const { data: mahankoshExplaination, isLoading: isFetchingMahankoshExplaination, isSuccess } = useQuery({
    queryKey: ['mahakosh-shabad', props.gurbaniWord ],
    queryFn: async () => {
      const data = await apiClient(url)
      return data;
    }
  });

  console.log(props.gurbaniWord, mahankoshExplaination, isFetchingMahankoshExplaination, 'GURBANI WORD')

  const mahankoshTooltipContent = getMahankoshTooltipContent(props.gurbaniWord, mahankoshExplaination, isFetchingMahankoshExplaination);
  
  if(isFetchingMahankoshExplaination && !isSuccess) {
    return <ReactTooltip
            id={props.tooltipId}
            className='mahankoshTooltipWrapper'
            {...mahanKoshConfig}
          >
          
      <div>Data is loading please wait</div>
    </ReactTooltip>
  }

  return (
    <ReactTooltip
      id={props.tooltipId}
      afterShow={() => {
        dispatch({ type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: true })
      }}
      afterHide={() => {
        dispatch({ type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: false })
        console.log("CLEAR MAHANKOSHINFORMAITON [MAHANKOSH-TOOLTIP]")
        props.clearMahankoshInformation()
      }}
      className="mahankoshTooltipWrapper"
      place="top"
      {...mahanKoshConfig}
    >
      {mahankoshTooltipContent}
    </ReactTooltip>
  )
}
