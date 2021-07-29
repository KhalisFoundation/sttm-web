import React from 'react'
import { useGetUser } from '@/hooks';
import { IUser } from '@/types/user'
import { useFavouriteShabads } from '@/components/FavouriteShabadButton/hooks';
const Stub = () => <div className="spinner" />;

const FavouriteShabads: React.FC = () => {
  const { isLoading } = useGetUser<IUser>()
  const favouriteShabads = useFavouriteShabads()

  React.useEffect(() => {
    console.log(favouriteShabads)
  })

  return (
    <>
      {
        isLoading
          ? <Stub />
          : (
            <>
              <h2>Favourite Shabads</h2>
              <ul>
                {favouriteShabads.map((shabadId: number) => {
                  return <li key={shabadId}>{shabadId}</li>
                })}
              </ul>
            </>
          )
      }
    </>
  )
}

export default FavouriteShabads
