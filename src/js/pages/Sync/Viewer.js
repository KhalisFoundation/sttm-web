/* globals API_URL */
/* globals BANIS_API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import ShabadContent from '../../components/ShabadContent';
import { buildApiUrl } from '@sttm/banidb';
import { TEXTS, SYNC_TYPES } from '../../constants';
import { versesToGurbani } from '../../util';

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
    showFullScreen: PropTypes.bool,
  };

  state = {
    response: null,
    type: null,
  };

  _fetchShabad = id =>
    Promise.resolve(this.setState({ response: null }))
      .then(() => fetch(buildApiUrl({ id, API_URL })))
      .then(r => r.json())
      .then(res => this.setState({ response: res }));


  _fetchBani = id =>
    Promise.resolve(this.setState({ response: null }))
      .then(() => fetch(`${BANIS_API_URL}/${id}`))
      .then(r => r.json())
      .then(res => this.setState({ response: res }));

  fetch = data => {
    const { type } = data;
    this.setState({ type });
    if (type === 'bani') {
      return this._fetchBani(data.id);
    } else if (type === 'shabad') {
      return this._fetchShabad(data.id);
    } else if (type === 'ceremony') {
      this.setState({ response: "Ceremonies coming soon." });
    }
  }

  componentDidMount() {
    if (Object.keys(this.props.data).length !== 0) {
      this.setState({ response: null });
      this.fetch(this.props.data);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.id !== this.props.data.id ||
      prevProps.data.type !== this.props.data.type) {
      this.setState({ response: null });
      this.fetch(this.props.data);
    }
  }

  render() {
    const {
      props: { namespaceString, data, showFullScreen },
      state: { response, type },
    } = this;

    console.log("data", data);
    console.log("response", response);

    if (Object.keys(data).length === 0) {
      return <h4>{TEXTS.SYNC_CONNECTED(namespaceString)}</h4>;
    }

    if (response) {
      if (type === SYNC_TYPES.BANI) {
        return (
          <ShabadContent
            type="sync"
            highlight={parseInt(data.highlight)}
            gurbani={
              versesToGurbani(
                response.verses.filter(v => v.mangalPosition !== 'above'),
                data.baniLength)
            }
            info={response.baniInfo}
            showFullScreen={showFullScreen}
          />
        )
      } else if (type === SYNC_TYPES.SHABAD) {
        return (
          <ShabadContent
            type="sync"
            highlight={parseInt(data.highlight)}
            gurbani={response.verses}
            info={response.shabadInfo}
            showFullScreen={showFullScreen}
          />
        )
      } else if (type === SYNC_TYPES.CEREMONY) {
        return (
          <h4>{response}</h4>
        )
      }
    }

    return <div className="spinner" />;
  }
}
