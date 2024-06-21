
import React from 'react'
import { PlacesType, Tooltip as ReactTooltip } from 'react-tooltip'

interface Props {
  referenceName: string;
  tooltip: string;
  extraSettings?: {place: PlacesType, delayShow: number};
}

const SettingsTooltip = ({ referenceName, tooltip, extraSettings }: Props) => (
  <ReactTooltip id={referenceName} className="settingsTooltipWrapper" {...extraSettings}>
    {tooltip}
  </ReactTooltip>
)


export default SettingsTooltip
