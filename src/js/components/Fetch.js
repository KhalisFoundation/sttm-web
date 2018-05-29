import React from 'react';
import PropTypes from 'prop-types';

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
  };

  static propTypes = {
    transform: PropTypes.func,
    url: PropTypes.string,
    children: PropTypes.func.isRequired,
    options: PropTypes.object,
  };

  componentDidMount() {
    const { url, options, transform } = this.props;

    this.fetchData(url, options, transform);
  }

  unsafe_componentwilleceiveprops(nextProps) {
    const { url, options, transform } = nextProps;

    this.fetchData(url, options, transform);
  }

  fetchData = (url, options, transform) => {
    this.setState({ loading: true });

    return fetch(url, options)
      .then(res =>
        transform(res)
          .then(data =>
            this.setState({
              loading: false,
              res,
              data,
              error: null,
            })
          )
          .catch(error =>
            this.setState({
              loading: false,
              res,
              data: null,
              error,
            })
          )
      )
      .catch(error =>
        this.setState({
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
