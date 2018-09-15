import React from 'react';
import PropTypes from 'prop-types';
import { TEXTS } from '@/constants';
import { pageView } from '@/util/analytics';

export default class RedirectExternal extends React.PureComponent {
  public static propTypes = {
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  public componentDidMount() {
    pageView(this.props.to);
    location.href = this.props.to;
  }

  public render() {
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
