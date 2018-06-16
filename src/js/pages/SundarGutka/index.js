/* globals BANIS_API_URL */
import React from 'react';
import { Link } from 'react-router-dom';
import { pageView } from '../../util/analytics';
import { versesToGurbani } from '../../util';
import PropTypes from 'prop-types';
import ShabadContent from '../../components/ShabadContent';
import Fetch from '../../components/Fetch';
import { TEXTS } from '../../constants';

export default class SundarGutka extends React.PureComponent {
  static propTypes = {
    location: PropTypes.shape({ hash: PropTypes.string }),
  };

  static DEFAULT_BAANI_ID = 0;

  $details = React.createRef();

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
                <details ref={this.$details}>
                  <summary>Sundar Gutka Baanies</summary>
                  <ul>
                    {baanies.map(({ ID, transliteration }) => (
                      <li key={ID}>
                        <a onClick={this.handleBaaniClick(ID)}>
                          {transliteration}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
                <div className="show-on-mobile">
                  {TEXTS.SUNDAR_GUTKA_APP}{' '}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.WahegurooNetwork.SundarGutka"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Android
                  </a>{' '}
                  |{' '}
                  <a
                    href="https://itunes.apple.com/in/app/sundar-gutka/id431446112?mt=8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    iOS
                  </a>
                </div>
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

  handleBaaniClick = ID => () => {
    window.scrollTo(0, 0);
    this.$details.current.setAttribute('close', '');
    this.$details.current.removeAttribute('open');
    this.setState({ currentBaaniId: ID });
  };

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
