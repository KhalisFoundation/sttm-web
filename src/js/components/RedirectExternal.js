import React from 'react';
import PropTypes from 'prop-types';
import { TEXTS } from '../constants';

export default class RedirectExternal extends React.PureComponent {
  static propTypes = {
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  componentDidMount() {
    location.href = this.props.to;
  }

  render() {
    const { to, name } = this.props;
    return (
      <div className="error-message">
        <div>
          <h3>
            {TEXTS.REDIRECTING} <a href={to}>{name}</a>.
          </h3>
          <section>
            {TEXTS.REDIRECTING_DESCRIPTION}{' '}
            <code style={{ wordBreak: 'break-word' }}>{to}</code>.
          </section>
        </div>
      </div>
    );
  }
}
