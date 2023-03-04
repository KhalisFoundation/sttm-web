import React from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { setShabadAudioPlayer } from "@/features/actions";
import { AudioPlayerIcon } from './Icons/CustomIcons';

interface IPlayerViewButton {
  showShabadAudioPlayer: boolean,
}

const PlayerViewButton = (props: any) => {
  const dispatch = useDispatch()
  const typedUseSelector: TypedUseSelectorHook<IPlayerViewButton> = useSelector;
  const showShabadAudioPlayer = typedUseSelector(state => state.showShabadAudioPlayer)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setShabadAudioPlayer(!showShabadAudioPlayer));
  }

  return (
    <button className={'meta-hukamnama-right'} onClick={onClick}>
        <AudioPlayerIcon className='hukamnama-right-headphonesIcon' children={<a title="Listen to Shabad">{`Listen to Shabad`}</a>}/>
    </button>
  )
}

export default PlayerViewButton