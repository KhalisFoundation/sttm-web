/* globals BANIS_API_URL */
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { pageView } from '../../util/analytics';
import PropTypes from 'prop-types';
import { TEXTS } from '../../constants';
import Baani from './Baani';
import BreadCrumb from '../../components/Breadcrumb';

export default class SundarGutka extends React.PureComponent {
  static propTypes = {
    location: PropTypes.shape({ hash: PropTypes.string }),
    match: PropTypes.object.isRequired,
  };

  static HOME_LINKS = [{ title: TEXTS.URIS.SUNDAR_GUTKA }];

  static BAANI_LINKS = [
    { url: '/sundar-gutka', title: TEXTS.URIS.SUNDAR_GUTKA },
    { title: TEXTS.URIS.SUNDAR_GUTKA_BAANI },
  ];

  $details = React.createRef();

  state = {
    baanies: null,
    q: '',
  };

  render() {
    const { baanies, q } = this.state;

    const isSundarGutkaHome = this.props.match.isExact;

    const links = isSundarGutkaHome
      ? SundarGutka.HOME_LINKS
      : SundarGutka.BAANI_LINKS;

    return (
      <div className="row" id="content-root">
        <BreadCrumb links={links} />
        <div id="help">
          {baanies === null ? (
            <div className="spinner" />
          ) : isSundarGutkaHome ? (
            <div className="wrapper">
              <h2>{TEXTS.SUNDAR_GUTKA_HEADER}</h2>
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
              <input
                type="search"
                name="baani-query"
                className="search"
                autoCorrect="off"
                value={q}
                autoFocus={true}
                autoCapitalize="none"
                onChange={this.handleSearch}
                placeholder="Search"
              />
              <ul className="list">
                {baanies
                  .filter(SundarGutka.filter(q))
                  .map(({ ID, transliteration, gurmukhiUni }) => (
                    <Link
                      to={`/sundar-gutka/${ID}`}
                      key={ID}
                      className="list--link"
                    >
                      <li className="list--item">
                        {SundarGutka.sanitize(transliteration)} - {gurmukhiUni}
                      </li>
                    </Link>
                  ))}
              </ul>
            </div>
          ) : (
            <Route
              path={this.props.match.url + '/:currentBaaniId'}
              component={Baani}
            />
          )}
        </div>
      </div>
    );
  }

  static filter = q => i =>
    q === '' ||
    SundarGutka.sanitize(i.transliteration)
      .toLowerCase()
      .includes(q.toLocaleLowerCase());

  static sanitize = t => t.replace(/\(n\)/gi, 'n');

  handleSearch = e => this.setState({ q: e.currentTarget.value });

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
