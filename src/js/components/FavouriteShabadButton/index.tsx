import React, { useState, useEffect } from 'react'
import { useGetUser } from '@/hooks/use-get-user'
import { StarIcon } from '../Icons/StarIcon'
import { onCreateFavourite, onRemoveFavourite } from './hooks'
import { isFalsy } from '@/util'
import { client } from './utils/api-client'
import { IMultipleShabadsProps } from '@/types/multiple-shabads';
import { IUser } from '@/types/user'

type FCProps = {
  shabad: IMultipleShabadsProps
}

export const FavouriteShabadButton: React.FC<FCProps> = ({ shabad }) => {
  const [isFavourite, setIsFavourite] = useState(false)
  // @TODO get user has this favourite shabad
  const user = useGetUser<IUser>()
  const handleRemoveClick = onRemoveFavourite(shabad)
  const handleAddClick = onCreateFavourite(shabad)
  useEffect(() => {
    if (!isFalsy(user)) {
      client('/user/shabad', {
        data: { email: user?.email, shabadId: shabad?.shabadId },
        token: undefined
      })
        .then(result => setIsFavourite(result))
        .catch(err => { throw new Error(err) })
    }
  }, [user])

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();


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


