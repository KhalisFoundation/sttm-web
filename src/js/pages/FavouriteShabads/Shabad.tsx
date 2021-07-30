/* eslint-disable react/prop-types */
import React from 'react'
import { IFavoriteShabad } from './type';

type Pshabad = {
  data: IFavoriteShabad
}

const Shabad: React.FC<Pshabad> = ({ data }) => {
  return (
    <div className="favourite-shabads--row">
      <div>{data.id}</div>
      <div>{data.verse}</div>
      <div>{data?.source}</div>
    </div>
  )
}

export default Shabad
