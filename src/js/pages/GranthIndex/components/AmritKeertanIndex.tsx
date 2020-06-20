/* globals AMRIT_KEERTAN_API_URL */
import React from 'react';
import { Link } from 'react-router-dom';


interface ITransliterations {
  en: string,
  hi: string,
  ipa: string,
  ur: string
}

interface IAmritKeertanApiResponse {
  headers: IAmritKeertanHeaders[]
}

interface IAmritKeertanHeaders {
  HeaderID: number,
  Gurmukhi: string,
  GurmukhiUni: string,
  Transliterations: ITransliterations,
  Updated: string,
}

interface IAmritKeertanProps {
  data: IAmritKeertanHeaders[]
}

export const AmritKeertanIndex: React.FC<IAmritKeertanProps> = ({ data }) => {

  return (<div>
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