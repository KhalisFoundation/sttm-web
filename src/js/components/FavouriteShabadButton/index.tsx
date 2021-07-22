/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { StarIcon } from '../Icons/StarIcon'
import { useClient, useFavouriteShabad } from './hooks'
import { IMultipleShabadsProps } from '@/types/multiple-shabads';
import { useQuery } from 'react-query'
import { IUser } from '@/types/user'
import { useGetUser } from '@/hooks';

type FCProps = {
  shabad: IMultipleShabadsProps
}

export const FavouriteShabadButton: React.FC<FCProps> = ({ shabad: { shabadId } }) => {
  //  
  const user = useGetUser<IUser>()
  const isFav = useFavouriteShabad(shabadId)
  const [isFavourite, setIsFavourite] = useState(isFav)
  const client = useClient()

  useEffect(() => {
    setIsFavourite(isFav)
  }, [isFav])

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    client(`favourite-shabad/${shabadId}`, { method: 'POST' })
      .then(success => setIsFavourite(success))
      .catch(err => { throw new Error(err) })
  }
  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    client(`favourite-shabad/${shabadId}`, { method: 'DELETE' })
      .then(success => setIsFavourite(!success))
      .catch(err => { throw new Error(err) })
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


