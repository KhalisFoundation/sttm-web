import React from 'react';
import { Link } from "react-router-dom";
import BreadCrumb from '@/components/Breadcrumb';
import { TEXTS } from '@/constants';
import { chapterIndices } from "./constants/chapter-indices";

const BhaiNandLalVaaranIndex: React.FC = () => {
  return (
    <div className="row" id="content-root">
      <BreadCrumb links={[{ title: TEXTS.URIS.INDEX, url: '/index' }, { title: 'Bhai Nand Lal Ji Vaaran' }]} />
      <div id="help">
        <div id="sidebar">
          <div className="granthIndex">
            <h3 id='amritKeertan'>Bhai Nand Lal Ji Vaaran</h3>
            <table>
              <thead>
                <tr className="GranthRows-Heading">
                  <th> Chapter name </th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.entries(chapterIndices).map(([key, { path }]) => {
                    return (
                      <tr key={key}>
                        <td><Link to={path}>{key}</Link></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  )
}
export default BhaiNandLalVaaranIndex