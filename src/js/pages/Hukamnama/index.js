import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from 'shabados';
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
        <h3 style={{ textAlign: 'center' }}>Daily Hukamnama from Sri Harmandir Sahib, Amritsar</h3>
        <ShabadContent
          gurbani={data.gurbani}
          info={data.shabadinfo}
          nav={data.navigation}
          type={'shabad'}
          source={data.source}
        />
      </div>
    );
  }
}

export default function Ang() {
  const url = buildApiUrl({ hukam: true });

  return (
    <PageLoader url={url}>{({ loading, data }) => (
      loading
        ? <Stub />
        : <Layout data={data} />
    )}</PageLoader>
  );
}
