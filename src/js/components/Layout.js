import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import { DEFAULT_PAGE_TITLE } from '../constants';
import { connect } from 'react-redux';
import { DARK_MODE_CLASS_NAME } from '../../../common/constants';

class Layout extends React.PureComponent {
  static defaultProps = {
    isHome: false,
    title: DEFAULT_PAGE_TITLE,
  };

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    darkMode: PropTypes.bool.isRequired,
    defaultQuery: PropTypes.string,
    isHome: PropTypes.bool,
    isAng: PropTypes.bool,
  };

  render() {
    const { children, isAng = false, isHome = false, ...props } = this.props;
    return (
      <React.Fragment>
        <Header
          defaultQuery={this.props.defaultQuery}
          isHome={isHome}
          isAng={isAng}
          {...props}
        />
        {children}
      </React.Fragment>
    );
  }

  updateTheme() {
    document.body.classList[this.props.darkMode ? 'add' : 'remove'](
      DARK_MODE_CLASS_NAME
    );
  }

  componentDidMount() {
    document.title = this.props.title;
    this.updateTheme();
  }

  componentDidUpdate() {
    this.updateTheme();
  }
}

export default connect(({ darkMode }) => ({ darkMode }))(Layout);
