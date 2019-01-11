import React from 'react';

import { TEXTS } from '../../constants';
import { pageView } from '../../util/analytics';
import ShabadContent from '../../components/ShabadContent';
import BreadCrumb from '../../components/Breadcrumb';
import { Gurbani, IKhajanaAPIResponse } from '@/types';

export const Stub = () => <div className="spinner" />;

export interface IHukamnamaLayoutProps {
  data: IKhajanaAPIResponse;
}

export default class Layout extends React.PureComponent<IHukamnamaLayoutProps> {
  public render() {
    const { data } = this.props;
    return (
      <div className="row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.HUKAMNAMA }]} />
        <ShabadContent
          gurbani={data.gurbani}
          info={data.shabadinfo}
          nav={data.navigation}
          random={false}
          type={'hukamnama'}
          source={data.source}
        />
      </div>
    );
  }
  public componentDidMount() {
    pageView('/hukamnama');
  }
}
