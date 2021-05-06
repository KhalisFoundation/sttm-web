import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
// import { IAmritKeertanHeader } from '../types';

interface IAmritKeertanIndexRowProps {
  headerId: number,
  name: string
}


export const AmritKeertanIndexRow: React.FC<IAmritKeertanIndexRowProps> = ({ headerId, name }) => {
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
        <p className="amritKeertanIndexRow loadingShabads">Loading...</p>
      </tr>
    );
  }

  const headerName = name.split(' ').join('-');

  return (
    <tr
      id={headerName}
      className="amritKeertanIndexRow"
      onClick={!shabads.length ? fetchShabads : undefined}>
      <td>
        <details open={!!shabads.length} ref={row}>
          <summary>{name}</summary>
          {shabads.length ? <ul className="amritKeertanIndexRowShabads">
            {shabads.map(({ GurmukhiUni: shabadName, ShabadID }) => {
              return (
                <li key={shabadName} className="amritKeertanIndexRowShabad">
                  <Link to={
                    {
                      pathname: `/amrit-keertan/shabads/${ShabadID}`,
                      state: {
                        prevPath: `/index/#${headerName}`
                      }
                    }} >
                    {shabadName}
                  </Link>
                </li>
              )
            })}
          </ul> : null}
        </details>
      </td>
    </tr>
  )
}
