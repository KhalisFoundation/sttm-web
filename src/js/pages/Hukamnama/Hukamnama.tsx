import React from 'react';
import { TEXTS } from '@/constants';
import { pageView } from '@/util/analytics';
import ShabadContent from '@/components/ShabadContent';
import BreadCrumb from '@/components/Breadcrumb/Breadcrumb';

export const Stub = () => <div className="spinner" />;

export default class Layout extends React.PureComponent<{ data: any }> {
  public componentDidMount() {
    pageView('/hukamnama');
  }

  public render() {
    const { data } = this.props;
    return (
      <div className="row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.HUKAMNAMA, url: '' }]} />
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
}
