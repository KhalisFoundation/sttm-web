/* eslint-disable react/prop-types */
import React from 'react'
import ReactTooltip from 'react-tooltip'

interface ISettingsTooltip {
  referenceName: string;
  tooltip: string;
  extraSettings?: any;
}

const SettingsTooltip: React.FC<ISettingsTooltip> = ({ referenceName, tooltip, extraSettings }) => {

  return (
    <ReactTooltip id={referenceName} className="settingsTooltipWrapper" {...extraSettings}>
      {tooltip}
    </ReactTooltip>
  )
}

export default SettingsTooltip
