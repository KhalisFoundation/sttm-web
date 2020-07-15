/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from '@sttm/banidb';

import { Spinner } from '@/components/Spinner';
import { saveAng } from '@/util//index';
import PageLoader from '../PageLoader';
import Layout from './Layout';

export default class Ang extends React.PureComponent {
  static propTypes = {
    ang: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    highlight: PropTypes.number,
  };
  render() {
    const { ang, source, highlight } = this.props;
    const url = buildApiUrl({ ang, source, API_URL });

    source === 'G' && saveAng(ang);

    return (
      <PageLoader url={url}>
        {({ loading, data }) =>
          loading ? (
            <Spinner />
          ) : (
              <Layout
                data={data}
                highlight={highlight}
                ang={ang}
                source={source}
              />
            )
        }
      </PageLoader>
    );
  }
}
