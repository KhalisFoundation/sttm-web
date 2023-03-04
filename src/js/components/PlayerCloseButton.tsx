import React from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { setShabadAudioPlayer } from "@/features/actions";
import TimesIcon from './Icons/Times';

interface IPlayerCloseButton {
  showShabadAudioPlayer: boolean,
}

const PlayerCloseButton = () => {
  const dispatch = useDispatch()
  const typedUseSelector: TypedUseSelectorHook<IPlayerCloseButton> = useSelector;
  const showShabadAudioPlayer = typedUseSelector(state => state.showShabadAudioPlayer)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setShabadAudioPlayer(!showShabadAudioPlayer));
  }

  return (
    <span className="shabad-player-close-icon">
      <TimesIcon onClick={onClick} />
    </span>
  )
}

export default PlayerCloseButton