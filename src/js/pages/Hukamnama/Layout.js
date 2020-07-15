import React from 'react';
import PropTypes from 'prop-types';
import { TEXTS } from '@/constants';
import { pageView } from '@/util/analytics';
import ShabadContent from '@/components/ShabadContent';
import BreadCrumb from '@/components/Breadcrumb';
import { getHukamnama } from '@/util/index';
import GenericError, { BalpreetSingh } from '@/components/GenericError';
export default class Layout extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    error: this.props.data.error,
  };

  render() {
    const { data } = this.props;
    let shabad;
    if (!this.state.error) {
      shabad = getHukamnama(data);
    }

    return this.state.error ? (
      <GenericError
        title={data.data.errorDescription}
        description={
          <React.Fragment>
            {TEXTS.HUKAMNAMA_NOT_FOUND_DESCRIPTION}{' '}
            <button id="error-link" onClick={this.context.router.history.goBack}>
              Click here to go back to previous hukamnama
            </button>
          </React.Fragment>
        }
        image={BalpreetSingh}
      />
    ) : (
        <div className="row" id="content-root">
          <BreadCrumb
            links={[{ title: TEXTS.HUKAMNAMA + ' | ' + shabad.expandedDate }]}
          />
          <ShabadContent
            gurbani={shabad.verses}
            info={shabad.shabadInfo}
            nav={shabad.nav}
            random={false}
            type={'hukamnama'}
            source={shabad.shabadInfo.source}
          />
        </div>
      );
  }
  componentDidMount() {
    pageView('/hukamnama');
  }
}
