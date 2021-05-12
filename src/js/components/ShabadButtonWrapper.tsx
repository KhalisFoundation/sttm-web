/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { IMultipleShabadsProps } from '@/types/multiple-shabads';
import { AddShabadButton } from './AddShabadButton';
import { RemoveShabadButton } from './RemoveShabadButton';
import { isShabadExistMultiview } from '@/util/shabad';

interface IShabadButtonWrapper {
  multipleShabads: IMultipleShabadsProps[]
}

type FCProps = {
  shabad: IMultipleShabadsProps
}

export const ShabadButtonWrapper: React.FC<FCProps> = ({ shabad }) => {
  const typedUseSelector: TypedUseSelectorHook<IShabadButtonWrapper> = useSelector;
  const multipleShabads = typedUseSelector(state => state.multipleShabads)
  const [isShabadAdded, setIsShabadAdded] = useState(isShabadExistMultiview(multipleShabads, shabad.verseId))

  useEffect(() => {
    setIsShabadAdded(isShabadExistMultiview(multipleShabads, shabad.verseId))
  }, [multipleShabads])

  return (
    <>
      {isShabadAdded
        ? (<RemoveShabadButton id={shabad.verseId} />)
        : (<AddShabadButton shabad={shabad} />)}
    </>
  )
}