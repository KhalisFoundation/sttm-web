import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ACTIONS, errorEvent } from '../util/analytics';
import GenericError, { SachKaur } from './GenericError';
import { TYPES, SOURCES, PLACEHOLDERS, TEXTS } from '../constants';

export default class HandleSearchError extends React.PureComponent {
  static propTypes = {
    q: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true });
    errorEvent({
      action: ACTIONS.NO_RESULTS_FOUND,
      label: JSON.stringify(error),
    });
    // eslint-disable-next-line no-console
    console.error({ error });
  }

  render() {
    const { q, type, source } = this.props;
    const className = PLACEHOLDERS[type][1] === true ? '' : 'gurbani-font';

    if (this.state.hasError) {
      return (
        <GenericError
          title={
            <React.Fragment>
              {TEXTS.NO_RESULTS_FOUND}{' '}
              <span className={className}>{`"${q}"`}</span>
            </React.Fragment>
          }
          description={
            <React.Fragment>
              {TEXTS.NO_RESULTS_FOUND_DESCRIPTION(SOURCES[source], TYPES[type])}
              <Link to="/help#Desktop-i-cant-find-my-shabad.">
                {' '}
                {TEXTS.HELP_SECTION}
              </Link>.
            </React.Fragment>
          }
          image={SachKaur}
        />
      );
    }
    return this.props.children;
  }
}
