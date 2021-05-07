import React from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import MergeIcon from '@/components/Icons/MergeIcon';
import cx from 'classnames';
import { setMultiViewPanel } from "@/features/actions";

interface IMultiViewButton {
  showMultiViewPanel: boolean
}

const MultiViewButton = (props: any) => {
  const dispatch = useDispatch()
  const typedUseSelector: TypedUseSelectorHook<IMultiViewButton> = useSelector;
  const showMultiViewPanel = typedUseSelector(state => state.showMultiViewPanel)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setMultiViewPanel(!showMultiViewPanel))
  }

  return (
    <button data-cy="multi-view-button" className={cx({
      'multi-view': true,
      'active': showMultiViewPanel
    })} onClick={onClick}>
      <MergeIcon width="2em" {...props} />
      <span className="show-on-desktop">Multi View</span>
    </button>
  )
}

export default MultiViewButton