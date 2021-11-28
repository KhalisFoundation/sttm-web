import React, { useEffect } from 'react';
import SmartBanner from 'react-smartbanner';

import BreadCrumb from '@/components/Breadcrumb';
import { raagIndices } from './constants/raag-indices';
import { pageView } from '../../util/analytics';
import { sanitizeHash } from './util';
import { TEXTS } from '../../constants';

export const BaniIndex: React.FC = () => {
  useEffect(() => {
    pageView('/index');
  }, [])

  return (
    <div className="row" id="content-root">
      <SmartBanner key="amritKeertan" position="top" title={'Amrit Keertan'} />
      <BreadCrumb links={[{ title: TEXTS.URIS.INDEX }]} />
      <div id="help">
        <div id="sidebar">
          <ul className="baniIndex">
            {Object.entries(raagIndices).map(
              ([key, { name: granthName, path, indices }]) => (
                <li key={key}>
                  <details>
                    <summary className="heading">{granthName}</summary>
                    <ul>
                      {indices.map(({ name }: { name: string }) => (
                        <li key={name}>
                          <a href={`/index/${path}#${sanitizeHash(name)}`}>
                            {name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              )
            )}
            {/* Bhai Nand Lal Ji Index */}
            <li>
              <a href="/index/bhai-nand-lal-vaaran">Bhai Nand Lal Ji Vaaran</a>
            </li>
            {/* Amrit keertan Index */}
            <li>
              <a href="/index/amrit-keertan">Amrit Keertan</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BaniIndex;