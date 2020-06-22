import React, { useEffect, useState, useRef, useCallback } from 'react';
import { sanitizeHash } from '../util';
// import { transliterationMap } from '../../../util/api/shabad';
// import { IAmritKeertanHeader } from '../types';

interface IAmritKeertanIndexRowProps {
  gurmukhiUni: string,
  headerId: number,
  name: string
}


export const AmritKeertanIndexRow: React.FC<IAmritKeertanIndexRowProps> = ({ headerId, name, gurmukhiUni }) => {
  const [isLoadingShabads, setLoadingShabads] = useState<boolean>(false);
  const [shabads, setShabads] = useState([]);
  const row = useRef(null);

  const fetchShabads = async () => {
    setLoadingShabads(true);
    try {
      const res = await fetch(`${AMRIT_KEERTAN_API_URL}/index/${headerId}`);
      if (res.status === 200) {
        const data = await res.json();
        setShabads(data.index);
        return;
      }

      throw Error(`from server, ${res.status}`)
    } catch (err) {
      console.error("FAILED LOADING SHABADS WITH ID", headerId);
    } finally {
      setLoadingShabads(false);
    }
  };

  if (isLoadingShabads) {
    return (
      <tr style={{ textAlign: 'center' }}>
        <td>
          {name}
          <div className="spinner"></div>
        </td>
      </tr>
    );
  }
  console.log(shabads, row, "....")
  return (
    <tr onClick={!shabads.length ? fetchShabads : undefined}>
      {shabads.length ?
        <details open ref={row}>
          <summary style={{ padding: 8 }}>{name}</summary>
          <ul>
            {shabads.map((shabad: any) => {
              const shabadName = shabad.Transliterations.en;

              return (
                <li key={name}>
                  <a href={`#${`${shabadName}`}`}>
                    {shabadName}
                  </a>
                </li>
              )
            })}
          </ul>
        </details>
        :
        <td>
          {name}
        </td>}
    </tr>
  )
}
