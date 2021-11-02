/* eslint-disable react/prop-types */
import React from 'react'
import { IFavoriteShabad } from '@/types/favorite-shabads';

interface ShabadProps {
  data: IFavoriteShabad
}

const Shabad: React.FC<ShabadProps> = ({ data }) => {
  return (
    <li className="favourite-shabads--row">
      <div>{data.id}</div>
      <div>{data.verse}</div>
      <div>{data?.source}</div>
    </li>
  )
}

export default Shabad
