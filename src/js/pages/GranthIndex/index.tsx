import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { pageView, toAngURL } from '@/util';
import { raagIndices, IRaagIndex } from '../BaniIndex/constants/raag-indices';
import { sanitizeHash, scrollToHash } from '../BaniIndex/util';
import BreadCrumb from '@/components/Breadcrumb';
import { TEXTS } from '@/constants';
import { getGranthIndex } from './util/get-granth-index';

export default function GranthIndex({ location }) {
  const { pathname, hash } = location;

  const [granth, setGranth] = useState<IRaagIndex | null>(null)

  useEffect(() => {
    pageView(pathname);

    // making sure the element is rendered on DOM before we get to that
    setTimeout(() => {
      scrollToHash(hash)
    }, 800);

    const granthIndex = getGranthIndex(pathname);
    setGranth(raagIndices[granthIndex])
  }, [])

  return (
    granth
    && (
      <div className="row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.URIS.INDEX, url: '/index' }, { title: granth.name }]} />
        <div id="help">
          <div id="sidebar</div>">
            <div className="granthIndex">
              <h3 id={granth.name}> {granth.name}</h3>
              <table>
                <thead>
                  <tr className="GranthRows-Heading">
                    <th> Raag Name </th>
                    <th> Ang Range </th>
                  </tr>
                </thead>
                <tbody>
                  {granth.indices.map(({ name, pages: [from, to], highlight }) => (
                    <tr id={`${sanitizeHash(name)}`} key={name}>
                      <td>{name}</td>
                      <td className="GranthRows" >
                        <Link
                          to={toAngURL({ ang: from, source: granth.source, highlight })}
                        >
                          {from}
                        </Link>{' '}
                        to{' '}
                        <Link to={toAngURL({ ang: to, source: granth.source })}>{to}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
