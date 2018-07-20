/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import ShabadContent from '@/components/ShabadContent';
import { buildApiUrl } from '@sttm/banidb';
import { TEXTS } from '@/constants';

/**
 *
 *
 * @export
 * @class Viewer
 * @augments {React.PureComponent<ViewerProps, { response: object}>}
 */
export default class Viewer extends React.PureComponent {
  /**
   * @typedef {object} ViewerProps
   * @property {string} namespaceString
   * @property {{ shabadid: number, highlight: number }} data
   */
  static propTypes = {
    namespaceString: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };

  state = {
    response: null,
  };

  _fetchShabad = id =>
    Promise.resolve(this.setState({ response: null }))
      .then(() => fetch(buildApiUrl({ id, API_URL })))
      .then(r => r.json())
      .then(response => this.setState({ response }));

  componentDidMount() {
    if (Object.keys(this.props.data).length !== 0) {
      this._fetchShabad(this.props.data.shabadid);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.shabadid !== this.props.data.shabadid) {
      this._fetchShabad(this.props.data.shabadid);
    }
  }

  render() {
    const {
      props: { namespaceString, data },
      state: { response },
    } = this;

    if (Object.keys(data).length === 0) {
      return <h4>{TEXTS.SYNC_CONNECTED(namespaceString)}</h4>;
    }

    if (response) {
      return (
        <ShabadContent
          type="shabad"
          highlight={data.highlight}
          gurbani={response.gurbani}
          info={response.shabadinfo}
        />
      );
    }

    return <div className="spinner" />;
  }
}
