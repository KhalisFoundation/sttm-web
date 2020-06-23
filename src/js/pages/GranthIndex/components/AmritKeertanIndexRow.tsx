import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
      <tr className="amritKeertanIndexRow loading">
        <td>
          {name}
        </td>
        <p className="amritKeertanIndexRow loadingShabads">Loading shabads please wait ...</p>
      </tr>
    );
  }

  return (
    <tr
      className="amritKeertanIndexRow"
      onClick={!shabads.length ? fetchShabads : undefined}>
      {shabads.length ?
        <details open ref={row}>
          <summary>{name}</summary>
          <ul className="amritKeertanIndexRowShabads">
            {shabads.map(({ Transliterations, ShabadID }) => {
              const shabadName = Transliterations.en;
              return (
                <li key={name} className="amritKeertanIndexRowShabad">
                  <Link to={`/amrit-keertan/shabads/${ShabadID}`}>
                    {shabadName}
                  </Link>
                </li>
              )
            })}
          </ul>
        </details>
        :
        <td>
          <a>{name}</a>
        </td>}
    </tr>
  )
}
