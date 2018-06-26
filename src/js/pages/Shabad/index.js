/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from '@sttm/banidb';
import PageLoader from '@/pages/PageLoader';
import { pageView } from '@/util/analytics';
import ShabadContent from '@/components/ShabadContent';
import { toShabadURL } from '@/util';

const Stub = () => <div className="spinner" />;

export default class Shabad extends React.PureComponent {
  static propTypes = {
    random: PropTypes.bool,
    highlight: PropTypes.number,
    id: PropTypes.string,
  };

  render() {
    const { random, id, highlight } = this.props;
    const url = buildApiUrl(
      random ? { random, API_URL } : { random, id, API_URL }
    );

    return (
      <PageLoader url={url}>
        {({ data, loading }) =>
          loading ? (
            <Stub />
          ) : (
            <div className="row" id="content-root">
              <ShabadContent
                random={random}
                type="shabad"
                highlight={highlight}
                info={data.shabadinfo}
                gurbani={data.gurbani}
                nav={data.navigation}
              />
            </div>
          )
        }
      </PageLoader>
    );
  }
  componentDidMount() {
    const { random, id, highlight } = this.props;

    if (random) {
      pageView('/shabad?random');
    } else {
      pageView(toShabadURL({ shabad: { shabadid: id, id: highlight } }));
    }
  }
}
