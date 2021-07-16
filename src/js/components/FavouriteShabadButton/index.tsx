/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { StarIcon } from '../Icons/StarIcon'
import { onCreateFavourite, onRemoveFavourite, useFavouriteShabad } from './hooks'
import { IMultipleShabadsProps } from '@/types/multiple-shabads';


type FCProps = {
  shabad: IMultipleShabadsProps
}

export const FavouriteShabadButton: React.FC<FCProps> = ({ shabad: { shabadId } }) => {
  console.log(shabadId)
  const isFavourite = useFavouriteShabad(shabadId)

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCreateFavourite(shabadId)
  }
  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onRemoveFavourite(shabadId)
  }

  return (
    isFavourite ?
      <button
        data-cy="favourite-shabad"
        onClick={handleAddClick}
      >
        <StarIcon />
      </button>
      :
      <button
        data-cy="favourite-shabad"
        onClick={handleRemoveClick}
      >
        <StarIcon fill="#868383" />
      </button>
  )
}


