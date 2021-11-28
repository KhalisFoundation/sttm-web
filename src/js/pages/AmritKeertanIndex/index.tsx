/* globals AMRIT_KEERTAN_API_URL */
import React, { useEffect } from 'react';
import SmartBanner from 'react-smartbanner';
import { AmritKeertanIndexRow } from './AmritKeertanIndexRow';
import { IAmritKeertanHeader } from './types';
import PageLoader from '@/pages/PageLoader';
import BreadCrumb from '@/components/Breadcrumb';
import { TEXTS } from '@/constants';

const Stub = () => <div className="spinner" />;

interface IAmritKeertanProps {
  headers: IAmritKeertanHeader[]
}

const AmritKeertanIndex: React.FC = () => {
  const url = AMRIT_KEERTAN_API_URL;
  return (
    <PageLoader url={url}>
      {({ data, loading }: { data: IAmritKeertanProps, loading: boolean }) =>
        loading ? (
          <Stub />
        ) : (
          <div className="row" id="content-root">
            <BreadCrumb links={[{ title: TEXTS.URIS.INDEX, url: '/index' }, { title: 'Amrit Keertan' }]} />
            <div id="help">
              <div id="sidebar">
                <div className="granthIndex">
                  <h3 id='amritKeertan'> Amrit Keertan</h3>
                  <table>
                    <thead>
                      <tr className="GranthRows-Heading">
                        <th> Chapter name </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.headers.map(({ HeaderID, GurmukhiUni }) => (
                        <AmritKeertanIndexRow
                          key={HeaderID}
                          headerId={HeaderID}
                          name={GurmukhiUni} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </PageLoader>
  )
}
export default AmritKeertanIndex