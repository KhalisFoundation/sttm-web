/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { buildApiUrl } from '@sttm/banidb';
import PageLoader from '../PageLoader';
import { pageView } from '../../util/analytics';
import ShabadContent from '../../components/ShabadContent';
import ListOfShabads from '../../components/ShabadContent/ListOfShabads';
import { toShabadURL, isKeyExists } from '../../util';
import BreadCrumb from '../../components/Breadcrumb';
import { TEXTS } from '../../constants';
const Stub = () => <div className="spinner" />;

export default class Shabad extends React.PureComponent {
  static propTypes = {
    random: PropTypes.bool,
    highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
                <BreadCrumb links={[{ title: TEXTS.URIS.SHABAD }]} />
                {
                  isKeyExists(data, 'shabadIds')
                  ? <ListOfShabads 
                      type="shabad"
                      shabads={data.shabads}
                      highlights={highlight}
                    />
                  : <ShabadContent
                      random={random}
                      type="shabad"
                      highlight={highlight}
                      info={data.shabadInfo}
                      gurbani={data.verses}
                      nav={data.navigation}
                      hideAddButton={false}
                    />
                }
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
