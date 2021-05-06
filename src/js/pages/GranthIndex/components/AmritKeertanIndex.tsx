/* globals AMRIT_KEERTAN_API_URL */
import React, { useEffect } from 'react';

import { AmritKeertanIndexRow } from './AmritKeertanIndexRow';
import { IAmritKeertanHeader } from '../types';

interface IAmritKeertanProps {
  data: IAmritKeertanHeader[]
}

export const AmritKeertanIndex: React.FC<IAmritKeertanProps> = ({ data }) => {

  return (
    <div className="granthIndex">
      <h3 id='amritKeertan'> Amrit Keertan</h3>
      <table>
        <thead>
          <tr className="GranthRows-Heading">
            <th> Chapter name </th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ HeaderID, GurmukhiUni }) => (
            <AmritKeertanIndexRow
              key={HeaderID}
              headerId={HeaderID}
              name={GurmukhiUni} />
          ))}
        </tbody>
      </table>
    </div>
  )
}