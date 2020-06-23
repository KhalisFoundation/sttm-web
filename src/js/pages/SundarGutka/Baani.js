/* globals BANIS_API_URL */
/* globals AMRIT_KEETAN_API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { versesToGurbani } from '../../util';
import ShabadContent from '../../components/ShabadContent';
import Fetch from '../../components/Fetch';
import { pageView } from '../../util/analytics';

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
    match: PropTypes.shape({
      params: PropTypes.shape({
        baaniId: PropTypes.string,
        shabadId: PropTypes.string
      }),
      url: PropTypes.string,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  };
  render() {
    const {
      match: {
        url
      },
    } = this.props;
    const baaniUrl = this.getBaaniUrl();

    return (
      <div className="baani">
        <Fetch url={`${baaniUrl}`}>
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
                    gurbani={this.getGurbani(data)}
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

  getGurbani = (data) => {
    if (this._sundarGutkaRoute)
      return versesToGurbani(data.verses.filter(v => v.mangalPosition !== 'above'));
    else if (this._amritKeertanRoute)
      return data.verses;
  }

  getBaaniUrl = () => {
    const {
      match: {
        params: { baaniId, shabadId }
      },
    } = this.props;

    if (this._sundarGutkaRoute)
      return `${BANIS_API_URL}/${baaniId}`
    else if (this._amritKeertanRoute)
      return `${AMRIT_KEERTAN_API_URL}/shabads/${shabadId}`
  }

  getPageView = () => {
    const {
      match: {
        params: { baaniId, shabadId }
      },
    } = this.props;


    if (this._sundarGutkaRoute)
      return `/sundar-gutka/${baaniId}`
    else if (this._amritKeertanRoute)
      return `/amrit-keertan/shabads/${shabadId}`
  }

  componentDidMount = () => {
    const {
      location: { pathname }
    } = this.props;

    this._sundarGutkaRoute = pathname.includes('sundar-gutka');
    this._amritKeertanRoute = pathname.includes('amrit-keertan');

    const page = this.getPageView();
    pageView(`${page}`);
  }
}
