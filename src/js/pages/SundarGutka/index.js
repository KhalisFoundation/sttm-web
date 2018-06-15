/* globals BANIS_API_URL */
import React from 'react';
import { Link } from 'react-router-dom';
import { pageView } from '../../util/analytics';
import { versesToGurbani } from '../../util';
import PropTypes from 'prop-types';
import ShabadContent from '../../components/ShabadContent';
import Fetch from '../../components/Fetch';

export default class SundarGutka extends React.PureComponent {
  static propTypes = {
    location: PropTypes.shape({ hash: PropTypes.string }),
  };

  static DEFAULT_BAANI_ID = 0;

  state = {
    baanies: null,
    currentBaaniId: SundarGutka.DEFAULT_BAANI_ID,
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
                {currentBaaniId !== SundarGutka.DEFAULT_BAANI_ID && (
                  <Fetch url={`${BANIS_API_URL}/${currentBaaniId}`}>
                    {({ data, loading }) =>
                      loading ? (
                        <div className="spinner" />
                      ) : (
                        <ShabadContent
                          type="shabad"
                          info={data.baniInfo}
                          nav={data.nav}
                          gurbani={versesToGurbani(data.verses)}
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
