import React from 'react';
import PropTypes from 'prop-types';
import { TEXTS } from '../../constants';
import { pageView } from '../../util/analytics';
import ShabadContent from '@/components/ShabadContent';
import BreadCrumb from '../../components/Breadcrumb';

export const Stub = () => <div className="spinner" />;

export default class Layout extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  render() {
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
  componentDidMount() {
    pageView('/hukamnama');
  }
}
