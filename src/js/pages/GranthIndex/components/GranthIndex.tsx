import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Location } from 'history';

import BreadCrumb from '@/components/Breadcrumb';
import Fetch from '@/components/Fetch';
import { raagIndices } from '../constants/raag-indices';
import { toAngURL } from '../../../util';
import { pageView } from '../../../util/analytics';
import { AmritKeertanIndex } from './AmritKeertanIndex';
import { sanitizeHash } from '../util';
import { TEXTS } from '../../../constants';

interface IGranthIndexProps {
  location: Location
}

export const GranthIndex: React.FC<IGranthIndexProps> = ({ location }) => {

  const { hash } = location;

  const scrollToHash = useCallback(() => {
    if (hash.includes('#')) {
      const $item = document.querySelector(`[id="${hash.replace('#', '')}"]`);
      if ($item) {
        requestAnimationFrame(() => window.scrollTo(0, $item.offsetTop));
      }
    }
  }, [hash]);

  useEffect(() => {
    scrollToHash();
    pageView('/index');
  }, [scrollToHash, pageView])


  return (<Fetch url={AMRIT_KEERTAN_API_URL}>
    {({ data, error, loading }) => {
      if (error) {
        return <div>ERROR WHILE LOADING AMRIT KEERTAN INDEX.</div>
      }

      if (loading) {
        return <div className="spinner" />
      }

      console.log(data, AMRIT_KEERTAN_API_URL, 'data.. from amrit keertan')

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