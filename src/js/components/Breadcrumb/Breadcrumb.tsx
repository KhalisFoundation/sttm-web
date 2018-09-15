import React from 'react';
import { Link } from 'react-router-dom';
import { TEXTS } from '@/constants';

/**
 *
 *
 * @export
 * @class BreadCrumb
 * @augments {React.PureComponent<BreadCrumbProps>}
 */
export default class BreadCrumb extends React.PureComponent<{
  links: Array<{ title: string; url: string }>;
}> {
  public render() {
    return (
      <h4 className="breadcrumb">
        {[{ title: TEXTS.URIS.HOME, url: '/' }].concat(this.props.links).map(
          ({ url, title }, index, { length }) =>
            index < length - 1 ? (
              <React.Fragment key={index}>
                <Link to={url}>{title}</Link> »{' '}
              </React.Fragment>
            ) : (
              title
            )
        )}
      </h4>
    );
  }
}
