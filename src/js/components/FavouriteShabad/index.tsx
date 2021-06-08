import React from 'react'
import { StarIcon } from '../Icons/StarIcon'
import { onCreateFavourite, onRemoveFavourite } from './hooks'

const FavouriteButton = ({ shabad }: { shabad: {} }) => {
  // @TODO get user has this favourite shabad
  const handleRemoveClick = onRemoveFavourite(shabad)
  const handleAddClick = onCreateFavourite(shabad)

  return (
    <div>
      <StarIcon />
    </div>
  )
}

export default FavouriteButton
