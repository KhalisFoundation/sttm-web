import React from 'react'
import { useDispatch } from "react-redux";
import { GearsIcon } from './Icons/CustomIcons'
import { toggleSettingsPanel } from '@/features/actions';

function DisplaySettingsButton({ isShowSettings }: { isShowSettings: boolean }) {
  const dispatch = useDispatch()

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(toggleSettingsPanel())
  }

  return (
    isShowSettings
      ?
      <div className="settingsButton">
        <button id="settings-icon" onClick={onClick}>
          <GearsIcon />
        </button>
      </div>
      : null
  )
}

export default DisplaySettingsButton
