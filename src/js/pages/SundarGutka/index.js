/* globals BANIS_API_URL */
import React from 'react';
import { Link } from 'react-router-dom';
import { pageView } from '../../util/analytics';
import PropTypes from 'prop-types';
import ShabadContent from '../../components/ShabadContent';
import Fetch from '../../components/Fetch';

export default class SundarGutka extends React.PureComponent {
  static propTypes = {
    location: PropTypes.shape({ hash: PropTypes.string }),
  };

  state = {
    baanies: null,
    currentBaaniId: 0,
  };

  render() {
    const { baanies, currentBaaniId } = this.state;
    return (
      <div className="row" id="content-root">
        <h4 className="breadcrumb">
          <Link to="/">Home</Link> » Sundar Gutka
        </h4>
        <div id="help">
          {baanies === null ? (
            <div className="spinner" />
          ) : (
            <React.Fragment>
              <div id="sidebar">
                <ul>
                  {baanies.map(({ ID, transliteration }) => (
                    <li key={ID}>
                      <a onClick={() => this.setState({ currentBaaniId: ID })}>
                        {transliteration}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <main>
                {currentBaaniId !== 0 && (
                  <Fetch url={`${BANIS_API_URL}/${currentBaaniId}`}>
                    {({ data, loading }) =>
                      loading ? (
                        <div className="spinner" />
                      ) : (
                        /* TODO make v2 data compliant with v1 */
                        <ShabadContent
                          type="shabad"
                          info={data.shabadInfo}
                          nav={data.nav}
                          gurbani={data.verses.map(v => ({
                            shabad: { ...v, gurbani: v.verse },
                          }))}
                        />
                      )
                    }
                  </Fetch>
                )}
              </main>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    pageView('/sundar-gutka');

    fetch(BANIS_API_URL)
      .then(r => r.json())
      .then(baanies =>
        this.setState({
          baanies,
          currentBaaniId: baanies[0].ID,
        })
      );
  }
}
