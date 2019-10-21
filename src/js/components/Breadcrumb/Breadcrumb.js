import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TEXTS } from '../../constants';

/**
 *
 *
 * @export
 * @class BreadCrumb
 * @augments {React.PureComponent<BreadCrumbProps>}
 */
export default class BreadCrumb extends React.PureComponent {
  /**
   * @typedef {object} BreadCrumbProps
   * @property {array} links
   */

  static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({ title: PropTypes.string, url: PropTypes.string })
    ).isRequired,
  };

  render() {
    return (
      <h4 className="breadcrumb">
        {[{ title: TEXTS.URIS.HOME, url: '/' }]
          .concat(this.props.links)
          .map(({ url, title }, index, { length }) =>
            index < length - 1 ? (
              <React.Fragment key={index}>
                <Link to={url}>{title}</Link>
                {' › '}
              </React.Fragment>
            ) : (
                <span key={`breadcrumbLast${index}`} className="breadcrumbLast">{title}</span>
              )
          )}
      </h4>
    );
  }
}
