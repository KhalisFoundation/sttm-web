import React from 'react';
import { AlignCenterIcon, AlignLeftIcon, LarivaarIcon, LarivaarAssistIcon } from "../Icons/CustomIcons";

const ClickableListItem = (props: any) => {
  const { controlsList } = props.controlsList;
  const renderIcon = (e: string) => {
    switch (e) {
      case 'larivaar':
        return (
          <LarivaarIcon className="tiny-font" />
        )

      case 'larivaar Assist':
        return (
          <LarivaarAssistIcon className="tiny-font" />
        )
      case 'align left':
        return (
          <AlignLeftIcon className="tiny-font settings-action-icon" />
        )
      case 'align center':
        return (
          <AlignCenterIcon className="tiny-font settings-action-icon" />
        )
    }
  }
  const controlsListMarkup = controlsList.map((item: any) => {
    return (
      <div key={item.label} className={`clickable-li-container ${item.value ? 'active-setting' : ''}`} onClick={item.action}>
        <span className="settings-action-icon">{renderIcon(item.label)}</span>
        <span className="settings-text clickable-li-label">{item.label}</span>
      </div>
    )
  });

  return (
    <>
      {controlsListMarkup}
    </>
  )

}

export default ClickableListItem;
