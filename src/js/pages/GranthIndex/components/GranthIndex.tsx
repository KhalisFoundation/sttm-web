import React, { useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Location } from 'history';

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
    setTimeout(() => scrollToHash(hash), 800); // making sure
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
                    <details>
                      <summary>Amrit Keertan</summary>
                      <ul>
                        {data.headers.map(({ Transliterations: { en: name } }) => (
                          <li key={name}>
                            <a
                              onClick={(e: MouseEvent<HTMLAnchorElement>) => scrollToHash(name)}
                              href={`#${name.split(' ').join('-')}`}>
                              {name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>

              <main>
                {Object.entries(raagIndices).map(
                  ([key, { name: granthName, source, indices }]) => (
                    <React.Fragment key={key}>
                      <h3 id={granthName}> {granthName}</h3>
                      <table>
                        <thead>
                          <tr>
                            <th> Raag Name </th>
                            <th> Ang Range </th>
                          </tr>
                        </thead>
                        <tbody>
                          {indices.map(({ name, pages: [from, to], highlight }) => (
                            <tr id={`${sanitizeHash(granthName, name)}`} key={name}>
                              <td>{name}</td>
                              <td>
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
                    </React.Fragment>
                  )
                )}
                <AmritKeertanIndex data={data.headers} />
              </main>
            </div>
          </div>
        )
      }}
    </Fetch>
  );
}

export default GranthIndex;