import React from 'react';
import { IAmritKeertanHeader } from '../types';

interface IAmritKeertanHeaderProps extends IAmritKeertanHeader {
  isExpanded: boolean;
  onHeaderClick: () => {}
}


export const AmritKeertanHeader: React.FC<IAmritKeertanHeaderProps>
  = ({
    HeaderID,
    GurmukhiUni,
    isExpanded
  }) => {

    return (
      <tr key={HeaderID}>
        {isExpanded ?
          <details>
            <summary>{GurmukhiUni}</summary>
            <ul>
              {indices.map(({ name }) => (
                <li key={name}>
                  <a href={`#${sanitizeHash(granthName, name)}`}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </details>
          :
          <td>
            {GurmukhiUni}
          </td>}
      </tr>
    )
  }