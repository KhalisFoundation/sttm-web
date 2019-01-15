import React from 'react';

import { TEXTS } from '../../constants';
import { pageView } from '../../util/analytics';
import ShabadContent from '../../components/ShabadContent';
import BreadCrumb from '../../components/Breadcrumb';
import { Gurbani, IKhajanaAPIResponse, IHukamnamaAPIResponse } from '@/types';

export const Stub = () => <div className="spinner" />;

export interface IHukamnamaLayoutProps {
  data: IKhajanaAPIResponse;
  date?: IHukamnamaAPIResponse['date'];
}

const getDate = (date?: IHukamnamaAPIResponse['date']) => {
  if (date && date.gregorian) {
    return `${date.gregorian.date}/${date.gregorian.month}/${
      date.gregorian.year
    }`;
  }
  return null;
};

export default class Layout extends React.PureComponent<IHukamnamaLayoutProps> {
  public render() {
    const { data, date } = this.props;
    return (
      <div className="row" id="content-root">
        <BreadCrumb
          links={[{ title: TEXTS.HUKAMNAMA + ' - ' + getDate(date) }]}
        />
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
