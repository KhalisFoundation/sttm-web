/* eslint-disable react/prop-types */
import React from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { setMultipleShabads, setMultiViewPanel } from "@/features/actions";
import { TEXTS } from '@/constants';
import { showToast } from '@/util';
import { IMultipleShabadsProps } from '@/types/multiple-shabads';
import AddIcon from './Icons/AddIcon';

interface IAddShabadButton {
  multipleShabads: IMultipleShabadsProps[],
  showMultiViewPanel: boolean
}

type FCProps = {
  shabad: IMultipleShabadsProps
}

export const AddShabadButton: React.FC<FCProps> = ({ shabad: { verseId, shabadId, verse, url } }) => {
  const dispatch = useDispatch()
  const typedUseSelector: TypedUseSelectorHook<IAddShabadButton> = useSelector;
  const multipleShabads = typedUseSelector(state => state.multipleShabads)
  const showMultiViewPanel = typedUseSelector(state => state.showMultiViewPanel)

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { id, shabadid, verse, url } = event.currentTarget.dataset

    // If Shabad already added then dont add again.
    if (multipleShabads.findIndex(e => e.id === parseInt(id)) === -1) {
      dispatch(setMultipleShabads({ id: parseInt(id), shabadId: parseInt(shabadid), verse, url }))
      !showMultiViewPanel && dispatch(setMultiViewPanel(true))
      showToast(TEXTS.SHABAD_ADDED_MESSAGE)
    } else {
      showToast(TEXTS.SHABAD_ALREADY_ADDED_MESSAGE)
    }
  }

  return (
    <button
      className="add-shabad"
      aria-label="Add Shabad"
      data-cy="add-shabad"
      data-id={verseId}
      data-shabadid={shabadId}
      data-verse={verse}
      data-url={url}
      onClick={onClick}>
      <AddIcon />
      <span className="show-on-desktop">
        Add</span>
    </button>
  )
}