/* globals AMRIT_KEERTAN_API_URL */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IAmritKeertanHeader } from '../types';

interface IAmritKeertanProps {
  data: IAmritKeertanHeader[]
}

export const AmritKeertanIndex: React.FC<IAmritKeertanProps> = ({ data }) => {

  useEffect(() => {

  });

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
          {data.map(({ HeaderID, GurmukhiUni }) => (
            <tr key={HeaderID}>
              <td>
                <Link to={"/"}>
                  {GurmukhiUni}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}