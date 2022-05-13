/* eslint-disable react/prop-types */
import React from 'react'
import { StarIcon } from '../Icons/StarIcon'
import { useFavouriteShabad, useCreateFavouriteShabad, useRemoveFavouriteShabad } from './hooks'
import { IMultipleShabadsProps } from '@/types/multiple-shabads';
import { IUser } from '@/types/user'
import { useGetUser } from '@/hooks';

type FCProps = {
  shabad: IMultipleShabadsProps
}

export const FavouriteShabadButton: React.FC<FCProps> = ({ shabad: { shabadId } }) => {
  const { user } = useGetUser<IUser>()
  // If user is valid then check for favourite shabads
  const isFav = useFavouriteShabad(shabadId)
  const isFavourite = user && isFav

  const create = useCreateFavouriteShabad()
  const remove = useRemoveFavouriteShabad()

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    create.mutate(shabadId)
  }

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    remove.mutate(shabadId)
  }

  return (
    user ?
      <>
        {
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
        }
      </>
      : null
  )
}


