import React from 'react';
import PropTypes from 'prop-types';
import { TEXTS } from '@/constants';

// This component uses children as a function pattern
export default class Fetch extends React.PureComponent {
  state = {
    loading: true,
    res: null,
    data: null,
    error: null,
  };

  static defaultProps = {
    transform: r => r.json(),
    options: {},
    timeout: 10000,
  };

  static propTypes = {
    transform: PropTypes.func,
    url: PropTypes.string,
    children: PropTypes.func.isRequired,
    options: PropTypes.object,
    timeout: PropTypes.number,
  };

  _setState = (...args) => this._mounted && this.setState(...args);

  componentDidMount() {
    this._mounted = true;
    const { url, options, transform, timeout } = this.props;

    this.fetchData(url, options, transform, timeout);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentDidUpdate(prevProps) {
    const { url, options, transform, timeout } = this.props;

    if (
      prevProps.url !== url ||
      prevProps.options !== options ||
      prevProps.transform !== transform
    ) {
      this.fetchData(url, options, transform, timeout);
    }
  }

  fetchData = (
    url,
    options,
    transform,
    timeout = Fetch.defaultProps.timeout
  ) => {
    this._setState({ loading: true });

    const timeoutPromise = new Promise(function(resolve, reject) {
      setTimeout(reject, timeout, TEXTS.TIMEOUT_ERROR);
    });

    // If timeoutPromise completes before fetch the top level catch is executed
    return Promise.race([timeoutPromise, fetch(url, options)])
      .then(res =>
        transform(res)
          .then(data =>
            this._setState({
              loading: false,
              res,
              data,
              error: null,
            })
          )
          .catch(error =>
            this._setState({
              loading: false,
              res,
              data: null,
              error,
            })
          )
      )
      .catch(error =>
        this._setState({
          loading: false,
          data: null,
          error,
        })
      );
  };

  render() {
    return this.props.children(this.state);
  }
}
