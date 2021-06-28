import React, { useEffect } from 'react'
import { useGetUser } from '@/hooks/use-get-user'
import { StarIcon } from '../Icons/StarIcon'
import { onCreateFavourite, onRemoveFavourite } from './hooks'
import { isFalsy } from '@/util'
import { client } from './utils/api-client'

const FavouriteButton = ({ shabad }: { shabad: {} }) => {
  // @TODO get user has this favourite shabad
  const [user,] = useGetUser()
  // const handleRemoveClick = onRemoveFavourite(shabad)
  // const handleAddClick = onCreateFavourite(shabad)
  useEffect(() => {
    if (!isFalsy(user)) {
      client('me')
    }
  }, [user])

  return (
    <div>
      <StarIcon />
    </div>
  )
}

export default FavouriteButton
