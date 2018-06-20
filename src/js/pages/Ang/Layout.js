import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { pageView, errorEvent, ACTIONS } from '../../util/analytics';
import GenericError from '../../components/GenericError';
import { SOURCES, TEXTS } from '../../constants';
import ShabadContent from '../../components/ShabadContent';
import { toAngURL } from '../../util';

export const Stub = () => <div className="spinner" />;

export default class Layout extends React.PureComponent {
  static propTypes = {
    ang: PropTypes.number,
    source: PropTypes.oneOf(Object.keys(SOURCES)),
    highlight: PropTypes.number,
    data: PropTypes.object.isRequired,
  };
  render() {
    const { ang, source, highlight, data } = this.props;

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
              </Link>{' '}
              or <Link to="/index"> {TEXTS.INDEX_SECTION}</Link>.
            </React.Fragment>
          }
          image={GenericError.BalpreetSingh}
        />
      );
    }

    return (
      <div className="row" id="content-root">
        <ShabadContent
          gurbani={data.page}
          highlight={highlight}
          nav={Array.isArray(data.navigation) ? {} : data.navigation}
          info={{ source: data.source }}
          type="ang"
        />
      </div>
    );
  }

  componentDidMount() {
    const { ang, source } = this.props;
    pageView(toAngURL({ ang, source }));
  }
}
