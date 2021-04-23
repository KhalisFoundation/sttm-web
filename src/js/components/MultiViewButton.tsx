import React from 'react'
import { useDispatch } from 'react-redux'
import MergeIcon from '@/components/Icons/MergeIcon';
import { setMultiViewPanel } from "@/features/actions";


const MultiViewButton = (props: any) => {
  const dispatch = useDispatch()

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setMultiViewPanel(true))
  }

  return (
    <button className="multi-view" onClick={onClick}>
      <MergeIcon width="2em" fill="" height="" {...props} />
      <span>Multi View</span>
    </button>
  )
}

export default MultiViewButton