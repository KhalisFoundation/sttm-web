/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { StarIcon } from '../Icons/StarIcon'
import { onCreateFavourite, onRemoveFavourite, useClient, useFavouriteShabad } from './hooks'
import { IMultipleShabadsProps } from '@/types/multiple-shabads';


type FCProps = {
  shabad: IMultipleShabadsProps
}

export const FavouriteShabadButton: React.FC<FCProps> = ({ shabad: { shabadId } }) => {
  const isFavourite = useFavouriteShabad(shabadId)
  const client = useClient()
  // const handleAddFavourite = onCreateFavourite(shabadId)
  // const handleRemoveFavourite = onRemoveFavourite(shabadId)

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    client(`favourite-shabad/${shabadId}`, { method: 'POST' })
      .catch(err => { throw new Error(err) })
  }
  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    client(`favourite-shabad/${shabadId}`, { method: 'DELETE' })
      .catch(err => { throw new Error(err) })
  }

  return (
    isFavourite ?
      <button
        data-cy="favourite-shabad"
        onClick={handleRemoveClick}
      >
        <StarIcon />
      </button>
      :
      <button
        data-cy="favourite-shabad"
        onClick={handleAddClick}
      >
        <StarIcon fill="#868383" />
      </button>
  )
}


