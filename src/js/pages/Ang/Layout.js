import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SOURCES } from 'shabados';
import { pageView, errorEvent, ACTIONS } from '../../util/analytics';
import GenericError, { BalpreetSingh } from '../../components/GenericError';
import { TEXTS } from '../../constants';
import ShabadContent from '../../components/ShabadContent';

export const Stub = () => <div className="spinner" />;

export default class Layout extends React.PureComponent {
  static propTypes = {
    ang: PropTypes.number,
    source: PropTypes.oneOf(Object.keys(SOURCES)),
    data: PropTypes.object.isRequired,
  };
  render() {
    const { ang, source, data } = this.props;

    if (data.page.length === 0) {
      errorEvent({
        action: ACTIONS.ANG_NOT_FOUND,
        label: `ang:${ang},source:${source}`,
      });
      return (
        <GenericError
          title={TEXTS.ANG_NOT_FOUND}
          description={
            <React.Fragment>
              {TEXTS.ANG_NOT_FOUND_DESCRIPTION(ang, SOURCES[source])}
              <Link to="/help#Desktop-i-cant-find-my-shabad.">
                {' '}
                {TEXTS.HELP_SECTION}
              </Link>.
            </React.Fragment>
          }
          image={BalpreetSingh}
        />
      );
    }

    return (
      <div className="row" id="content-root">
        <ShabadContent
          gurbani={data.page}
          nav={Array.isArray(data.navigation) ? {} : data.navigation}
          info={{ source: data.source }}
          type="ang"
        />
      </div>
    );
  }

  componentDidMount() {
    const { ang, source } = this.props;
    pageView(`/ang?ang=${ang}&source=${source}`);
  }
}
