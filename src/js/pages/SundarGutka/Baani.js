/* globals BANIS_API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { versesToGurbani } from '../../util';
import ShabadContent from '../../components/ShabadContent';
import Fetch from '../../components/Fetch';

/**
 *
 *
 * @export
 * @class Baani
 * @augments {React.PureComponent<BaaniProps>}
 */
export default class Baani extends React.PureComponent {
  /**
   * @typedef {object} BaaniProps
   * @property {object} data
   */

  static propTypes = {
    match: PropTypes.shape({ params: { currentBaaniId: PropTypes.string } })
      .isRequired,
  };

  render() {
    const {
      match: {
        params: { currentBaaniId },
        url,
      },
    } = this.props;

    return (
      <div className="baani">
        <Fetch url={`${BANIS_API_URL}/${currentBaaniId}`}>
          {({ data, error, loading }) =>
            error ? (
              <Redirect to={url} />
            ) : loading ? (
              <div className="spinner" />
            ) : (
              <ShabadContent
                type="shabad"
                info={data.baniInfo}
                nav={data.nav}
                gurbani={versesToGurbani(data.verses)}
                hideMeta
                controlProps={{
                  disableSplitView: true,
                }}
              />
            )
          }
        </Fetch>
      </div>
    );
  }
}
