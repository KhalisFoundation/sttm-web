import React from 'react';
import PropTypes from 'prop-types';

export default class RenderPromise extends React.PureComponent {

  public static propTypes = {
    promise: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };
  public state = {
    pending: true,
    resolved: false,
    rejected: false,
  };

  public componentDidMount() {
    this.executePromise(this.props.promise);
  }

  public componentDidUpdate(prevProps) {
    if (prevProps.promise !== this.props.promise) {
      this.executePromise(this.props.promise);
    }
  }

  public executePromise = promise =>
    promise()
      .then(data =>
        this.setState({ pending: false, resolved: data, rejected: false })
      )
      .catch(error =>
        this.setState({ pending: false, resolved: false, rejected: error })
      );

  public render() {
    return this.props.children(this.state);
  }
}
