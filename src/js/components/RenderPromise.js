import React from 'react';
import PropTypes from 'prop-types';

export default class RenderPromise extends React.PureComponent {
  state = {
    pending: true,
    resolved: false,
    rejected: false,
  };

  static propTypes = {
    promise: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.executePromise(this.props.promise);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.promise !== this.props.promise) {
      this.executePromise(this.props.promise);
    }
  }

  executePromise = promise =>
    promise()
      .then(data =>
        this.setState({ pending: false, resolved: data, rejected: false })
      )
      .catch(error =>
        this.setState({ pending: false, resolved: false, rejected: error })
      );

  render() {
    return this.props.children(this.state);
  }
}
