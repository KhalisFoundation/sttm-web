/* eslint-disable react/prop-types */
/* globals API_URL */
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { useDispatch } from 'react-redux';
import { useFetchData } from '@/hooks';
import { getMahankoshTooltipContent } from './util/';
import {
  SET_MAHANKOSH_TOOLTIP_ACTIVE,
} from '@/features/actions';

interface Props {
  tooltipId: string;
  gurbaniWord: string;
  clearMahankoshInformation: () => {};
  isFetchingMahankoshExplaination: boolean;
}

export const MahankoshTooltip = (props: Props) => {
  const dispatch = useDispatch();
  const url = props.gurbaniWord ? `${API_URL}kosh/word/${props.gurbaniWord}` : '';
  const {
    isFetchingData: isFetchingMahankoshExplaination,
    data: mahankoshExplaination,
  } = useFetchData(url);

  useEffect(() => {
    document.addEventListener('click', props.clearMahankoshInformation);

    return document.removeEventListener('click', props.clearMahankoshInformation);
  }, [])

  const mahankoshTooltipContent = getMahankoshTooltipContent(props.gurbaniWord, mahankoshExplaination, isFetchingMahankoshExplaination);
  
  return (
    <ReactTooltip
      id={props.tooltipId}
      event="click"
      globalEventOff="click"
      afterShow={() => {
        dispatch({ type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: true })
      }}
      afterHide={() => {
        dispatch({ type: SET_MAHANKOSH_TOOLTIP_ACTIVE, payload: false })
        props.clearMahankoshInformation()
        ReactTooltip.rebuild()
      }}
      className="mahankoshTooltipWrapper"
      place="top"
      clickable
      multiline
      overridePosition={({ left, top }: { left: number, top: number }) => {
        if (window.innerWidth < 500) {
          return { top: top < 0 ? 20 : top, left: 20 }
        }
        return { top, left }
      }}
      getContent={() => mahankoshTooltipContent}
    />
  )
}
