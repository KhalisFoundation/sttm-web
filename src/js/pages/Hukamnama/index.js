/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from 'shabados';
import { TEXTS } from '../../constants';
import PageLoader from '../PageLoader';
import ShabadContent from '../../components/ShabadContent';

const Stub = () => <div className="spinner" />;

class Layout extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  render() {
    const { data } = this.props;
    return (
      <div className="body_text">
        <h3 style={{ textAlign: 'center' }}>{TEXTS.HUKAMNAMA}</h3>
        <div className="row" id="content-root">
          <ShabadContent
            gurbani={data.gurbani}
            info={data.shabadinfo}
            nav={data.navigation}
            random={false}
            type={'hukamnama'}
            source={data.source}
          />
        </div>
      </div>
    );
  }
}

export default function Ang() {
  const url = buildApiUrl({ hukam: true, API_URL });

  return (
    <PageLoader url={url}>
      {({ loading, data }) => (loading ? <Stub /> : <Layout data={data} />)}
    </PageLoader>
  );
}
