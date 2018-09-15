/* globals BANIS_API_URL */
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { pageView } from '@/util/analytics';
import PropTypes from 'prop-types';
import { TEXTS } from '@/constants';
import Baani from './Baani';
import BreadCrumb from '@/components/Breadcrumb/Breadcrumb';
import Android from '@/components/Icons/Android';
import AppleiOS from '@/components/Icons/AppleiOS';

class SundarGutka extends React.PureComponent {
  public static propTypes = {
    transliterationLanguages: PropTypes.array.isRequired,
    location: PropTypes.shape({ hash: PropTypes.string }),
    match: PropTypes.object.isRequired,
  };

  public static HOME_LINKS = [{ title: TEXTS.URIS.SUNDAR_GUTKA }];

  public static BAANI_LINKS = [
    { url: '/sundar-gutka', title: TEXTS.URIS.SUNDAR_GUTKA },
    { title: TEXTS.URIS.SUNDAR_GUTKA_BAANI },
  ];

  public state = {
    baanies: null,
    q: '',
  };

  public render() {
    const {
      props: {
        match: { isExact: isSundarGutkaHome },
        transliterationLanguages,
      },
      state: { baanies, q },
    } = this;

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
            <div className="wrapper" style={{ width: '100%' }}>
              <h2>{TEXTS.SUNDAR_GUTKA_HEADER}</h2>
              <div className="show-on-mobile sundar-gutka-app-promo">
                {TEXTS.SUNDAR_GUTKA_APP}{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.WahegurooNetwork.SundarGutka"
                  target="_blank"
                  className="playstore--link"
                  rel="noopener noreferrer"
                >
                  <Android className="playstore--icon" /> {TEXTS.ANDROID}
                </a>{' '}
                |{' '}
                <a
                  href="https://itunes.apple.com/in/app/sundar-gutka/id431446112?mt=8"
                  target="_blank"
                  className="playstore--link"
                  rel="noopener noreferrer"
                >
                  <AppleiOS className="appstore--icon" /> {TEXTS.IOS}
                </a>
              </div>
              <input
                type="search"
                name="baani-query"
                className="search"
                value={q}
                autoCorrect="off"
                autoCapitalize="none"
                onChange={this.handleSearch}
                placeholder="Search"
              />
              <ul className="list">
                {baanies
                  .filter(SundarGutka.filter(q))
                  .map(({ ID, transliteration, gurmukhiUni }, i) => (
                    <Link
                      to={`/sundar-gutka/${ID}`}
                      key={ID}
                      className="list--link"
                    >
                      <li
                        className="list--item"
                        style={{
                          animationDelay: i < 15 ? `${20 * i}ms` : 0,
                        }}
                      >
                        {gurmukhiUni}{' '}
                        {transliterationLanguages.includes('english') &&
                          `- ${SundarGutka.sanitize(transliteration)}`}
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

  public static filter = q => i =>
    q === '' ||
    SundarGutka.sanitize(i.transliteration)
      .toLowerCase()
      .includes(q.toLocaleLowerCase());

  public static sanitize = t => t.replace(/\(n\)/gi, 'n');

  public handleSearch = e => this.setState({ q: e.currentTarget.value });

  public componentDidUpdate({ match: { isExact: wasExact } }) {
    if (wasExact === false && this.props.match.isExact) {
      pageView('/sundar-gutka');
    }
  }

  public componentDidMount() {
    if (this.props.match.isExact) {
      pageView('/sundar-gutka');
    }

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

export default connect(({ transliterationLanguages }) => ({
  transliterationLanguages,
}))(SundarGutka);
