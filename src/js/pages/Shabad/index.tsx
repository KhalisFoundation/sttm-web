/* globals API_URL */
import React from 'react';
import { buildApiUrl } from '@sttm/banidb';
import PageLoader from '@/pages/PageLoader';
import { pageView } from '@/util/analytics';
import ShabadContent from '@/components/ShabadContent';
import { toShabadURL } from '@/util';

const Stub = () => <div className="spinner" />;

type ShabadProps = {
  random: boolean;
  highlight: number;
  id: string;
};
export default class Shabad extends React.PureComponent<ShabadProps> {
  public render() {
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

  public componentDidMount() {
    const { random, id, highlight } = this.props;

    if (random) {
      pageView('/shabad?random');
    } else {
      pageView(toShabadURL({ shabad: { shabadid: id, id: highlight } }));
    }
  }
}
