/* globals API_URL */
import React, { useState, useEffect } from 'react'
import Shabad from './Shabad';

import { buildApiUrl } from '@sttm/banidb';
import { client } from '@/components/FavouriteShabadButton/utils/api-client';
import { isKeyExists } from '@/util';

import { useGetUser } from '@/hooks';
import { useFavouriteShabads } from '@/components/FavouriteShabadButton/hooks';

import { IUser } from '@/types/user'
import { IFavoriteShabad, IShabad } from '@/types/favorite-shabads';
import Spinner from '@/components/Spinner/Spinner';

const FavouriteShabads: React.FC = () => {
  const { isLoading } = useGetUser<IUser>()
  const favouriteShabads = useFavouriteShabads()
  const [shabadsLoading, setShabadsLoading] = useState(true)
  const [shabadsListing, setShabadsListing] = useState<IFavoriteShabad[]>([])

  useEffect(() => {
    if (favouriteShabads.length) {
      const id = favouriteShabads.join(',')
      const url = buildApiUrl({ API_URL, id });
      client(url).then(data => {
        const shabadsArray: IFavoriteShabad[] = []
        if (isKeyExists(data, 'shabadIds')) {
          data.shabads.map((shabad: IShabad) => {
            shabadsArray.push({ id: Number(shabad.shabadInfo.shabadId), verse: shabad.verses[0].verse.unicode })
          });
        } else {
          shabadsArray.push({ id: data.shabadInfo.shabadId, verse: data.verses[0].verse.unicode })
        }
        setShabadsListing(shabadsArray)
      })
    }
  }, [favouriteShabads])

  useEffect(() => {
    if (shabadsListing.length) {
      setShabadsLoading(false)
    }
  }, [shabadsListing, setShabadsLoading])


  return (
    <>
      {
        isLoading
          ? <Spinner />
          : (
            <>
              <div className="favourite-shabads">
                <h2>Favourite Shabads</h2>
                <ul>
                  {
                    shabadsLoading
                      ? 'Loading Shabads...'
                      :
                      shabadsListing.length
                        ? shabadsListing?.map((shabad, index) => <li key={index}><Shabad data={shabad} /></li>)
                        : 'No Favourite Shabad Yet'
                  }
                </ul>
              </div>
            </>
          )
      }
    </>
  )
}

export default FavouriteShabads
