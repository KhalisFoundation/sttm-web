/* globals API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import ShabadContent from '../../components/ShabadContent';
import { buildApiUrl } from 'shabados';

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

    return (
      <React.Fragment>
        <h4>
          Connected to <code>{namespaceString}</code>
        </h4>
        {Object.keys(data).length === 0 ? null : response ? (
          <ShabadContent
            type="shabad"
            highlight={data.highlight}
            gurbani={response.gurbani}
            info={response.shabadinfo}
          />
        ) : (
          'Loading...'
        )}
      </React.Fragment>
    );
  }
}
