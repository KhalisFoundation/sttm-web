import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Location } from 'history';
import SmartBanner from 'react-smartbanner';

import BreadCrumb from '@/components/Breadcrumb';
import Fetch from '@/components/Fetch';
import { raagIndices } from '../constants/raag-indices';
import { toAngURL } from '../../../util';
import { pageView } from '../../../util/analytics';
import { AmritKeertanIndex } from './AmritKeertanIndex';
import { sanitizeHash, scrollToHash } from '../util';
import { TEXTS } from '../../../constants';
interface IGranthIndexProps {
  location: Location
}

export const GranthIndex: React.FC<IGranthIndexProps> = ({ location }) => {
  const { hash } = location;

  useEffect(() => {
    pageView('/index');

    // making sure the element is rendered on DOM before we get to that
    setTimeout(() => {
      scrollToHash(hash)
    }, 800);

  }, [])

  return (
    <Fetch url={AMRIT_KEERTAN_API_URL}>
      {({ data, error, loading }) => {
        if (error) {
          return <div>ERROR WHILE LOADING AMRIT KEERTAN INDEX.</div>
        }

        if (loading) {
          return <div className="spinner" />
        }

        return (
          <div className="row" id="content-root">
            <SmartBanner key="amritKeertan" position="top" title={'Amrit Keertan'} />
            <BreadCrumb links={[{ title: TEXTS.URIS.INDEX }]} />
            <div id="help">
              <div id="sidebar">
                <ul>
                  {Object.entries(raagIndices).map(
                    ([key, { name: granthName, indices }]) => (
                      <li key={key}>
                        <details>
                          <summary>{granthName}</summary>
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
                      </li>
                    )
                  )}
                  {/* Amrit keertan Index */}
                  <li>
                    <a href="#amritKeertan">Amrit Keertan</a>
                  </li>
                </ul>
              </div>

              <main>
                {Object.entries(raagIndices).map(
                  ([key, { name: granthName, source, indices }]) => (
                    <div className="granthIndex" key={key}>
                      <h3 id={granthName}> {granthName}</h3>
                      <table>
                        <thead>
                          <tr className="GranthRows-Heading">
                            <th> Raag Name </th>
                            <th> Ang Range </th>
                          </tr>
                        </thead>
                        <tbody>
                          {indices.map(({ name, pages: [from, to], highlight }) => (
                            <tr id={`${sanitizeHash(granthName, name)}`} key={name}>
                              <td>{name}</td>
                              <td className="GranthRows" >
                                <Link
                                  to={toAngURL({ ang: from, source, highlight })}
                                >
                                  {from}
                                </Link>{' '}
                            to{' '}
                                <Link to={toAngURL({ ang: to, source })}>{to}</Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                )}
                <AmritKeertanIndex data={data.headers} />
              </main>
            </div>
          </div >
        )
      }}
    </Fetch >
  );
}

export default GranthIndex;