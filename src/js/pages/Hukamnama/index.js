/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
      <div className="row" id="content-root">
        <h4 className="breadcrumb">
          <Link to="/">Home</Link> » {TEXTS.HUKAMNAMA}
        </h4>
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

export default function Ang() {
  const url = buildApiUrl({ hukam: true, API_URL });

  return (
    <PageLoader url={url}>
      {({ loading, data }) => (loading ? <Stub /> : <Layout data={data} />)}
    </PageLoader>
  );
}
