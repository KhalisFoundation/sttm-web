import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import { DEFAULT_PAGE_TITLE } from '../constants';

export default class Layout extends React.PureComponent {
  static defaultProps = {
    isHome: false,
    title: DEFAULT_PAGE_TITLE,
  };

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    defaultQuery: PropTypes.string,
    isHome: PropTypes.bool,
  };

  componentDidMount() {
    document.title = this.props.title;
  }

  render() {
    const { children, isHome = false, ...props } = this.props;
    return (
      <React.Fragment>
        <Header
          defaultQuery={this.props.defaultQuery}
          isHome={isHome}
          {...props}
        />
        {children}
      </React.Fragment>
    );
  }
}
