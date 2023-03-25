/* eslint-disable react/prop-types */
import React from 'react'
import { StarIcon } from '../Icons/StarIcon'
import { useFavouriteShabad, useRemoveFavouriteShabad } from './hooks'
import { IMultipleShabadsProps } from '@/types/multiple-shabads';
import { IUser } from '@/types/user'
import { useGetUser } from '@/hooks';
import { useDispatch } from 'react-redux';
import { setGurbaniVerses, setIsModalOpen } from '@/features/actions';

type Props = {
  shabad: IMultipleShabadsProps;
  gurbani: [];
}

export const FavouriteShabadButton = ({ shabad: { shabadId }, gurbani }: Props) => {
  const { user } = useGetUser<IUser>()

  // If user is valid then check for favourite shabads
  const isFav = useFavouriteShabad(shabadId)
  const isFavourite = user && isFav
  const remove = useRemoveFavouriteShabad()
  const dispatch = useDispatch();

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setGurbaniVerses(gurbani))
    dispatch(setIsModalOpen(true));
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


