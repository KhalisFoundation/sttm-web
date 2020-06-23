/* globals AMRIT_KEERTAN_API_URL */
import React, { useEffect } from 'react';

import { AmritKeertanIndexRow } from './AmritKeertanIndexRow';
import { IAmritKeertanHeader } from '../types';

interface IAmritKeertanProps {
  data: IAmritKeertanHeader[]
}

export const AmritKeertanIndex: React.FC<IAmritKeertanProps> = ({ data }) => {

  return (
    <div>
      <h3 id='amritKeertan'> Amrit Keertan</h3>
      <table>
        <thead>
          <tr>
            <th> Chapter name </th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ HeaderID, GurmukhiUni, Transliterations }) => (
            <AmritKeertanIndexRow
              key={HeaderID}
              headerId={HeaderID}
              name={Transliterations.en}
              gurmukhiUni={GurmukhiUni} />
          ))}
        </tbody>
      </table>
    </div>
  )
}