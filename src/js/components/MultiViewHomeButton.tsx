import React from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Multiview } from '@/components/Icons/Multiview';
import { setMultiViewPanel } from "@/features/actions";

interface IMultiViewButton {
  showMultiViewPanel: boolean
}

const MultiViewHomeButton = () => {
  const dispatch = useDispatch()
  const typedUseSelector: TypedUseSelectorHook<IMultiViewButton> = useSelector;
  const showMultiViewPanel = typedUseSelector(state => state.showMultiViewPanel)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setMultiViewPanel(!showMultiViewPanel))
  }

  return (
    <button className="fp-buttons apps-item" onClick={onClick}>
      <div className="apps-icon-container">
        <Multiview />
      </div>
    </button>

  )
}

export default MultiViewHomeButton