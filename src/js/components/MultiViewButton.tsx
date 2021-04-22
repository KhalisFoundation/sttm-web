import React from 'react'
import { connect } from 'react-redux'
import MergeIcon from '@/components/Icons/MergeIcon';
import { setMultiViewPanel } from "@/features/actions";


const MultiViewButton = ({ setMultiViewPanel }: any) => {

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMultiViewPanel(true)
  }

  return (
    <button className="multi-view" onClick={onClick}>
      <MergeIcon width="2em" fill="" height="" />
      Multi View
    </button>
  )
}

const mapStateToProps = ({ }) => ({})

const mapDispatchToProps = ({
  setMultiViewPanel
})

export default connect(mapStateToProps, mapDispatchToProps)(MultiViewButton)