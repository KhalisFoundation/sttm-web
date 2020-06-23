import React from 'react';
import { Location } from 'history';
import { RouteComponentProps } from 'react-router-dom';

import { RenderShabads } from '../../../components/RenderShabads';
import BreadCrumb from '../../../components/Breadcrumb';
import { TEXTS } from '../../../constants';

interface IAmritKeertanShabadsProps extends RouteComponentProps<{}> {
  location: Location
}

export const AmritKeertanShabads: React.FC<IAmritKeertanShabadsProps> = (props) => {
  const links = [
    {
      url: '/index', title: TEXTS.URIS.INDEX,
    }, {
      title: TEXTS.URIS.AMRIT_KEERTAN
    }
  ]
  return (
    <div className="amritKeertanShabads">
      <BreadCrumb links={links} />
      <RenderShabads {...props} />
    </div>
  )
}