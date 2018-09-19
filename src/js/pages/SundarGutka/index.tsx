/* globals BANIS_API_URL */
import React, { ChangeEvent } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { pageView } from '@/util/analytics';
import { TEXTS } from '@/constants';
import Baani from './Baani';
import BreadCrumb from '@/components/Breadcrumb/Breadcrumb';
import Android from '@/components/Icons/Android';
import AppleiOS from '@/components/Icons/AppleiOS';
import { Store } from '@/features/types';

type SundarGutkaProps = {
  transliterationLanguages: string[];
  match: { isExact: boolean; url: string };
  location: { hash: string };
};
class SundarGutka extends React.PureComponent<
  SundarGutkaProps,
  {
    currentBaaniId: number;
    baanies: BaaniType[] | null;
    q: string;
  }
> {
  public static HOME_LINKS = [{ title: TEXTS.URIS.SUNDAR_GUTKA, url: '' }];

  public static BAANI_LINKS = [
    { url: '/sundar-gutka', title: TEXTS.URIS.SUNDAR_GUTKA },
    { title: TEXTS.URIS.SUNDAR_GUTKA_BAANI, url: '' },
  ];

  public static filter = (q: string) => (i: BaaniType) =>
    q === '' ||
    SundarGutka.sanitize(i.transliteration)
      .toLowerCase()
      .includes(q.toLocaleLowerCase());

  public static sanitize = (t: string) => t.replace(/\(n\)/gi, 'n');

  public state = {
    currentBaaniId: -1,
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

    let content = <div className="spinner" />;

    if (baanies !== null) {
      if (isSundarGutkaHome) {
        content = (
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
                .map(
                  (
                    { ID, transliteration, gurmukhiUni }: BaaniType,
                    i: number
                  ) => (
                    <Link
                      to={`/sundar-gutka/${ID}`}
                      key={ID}
                      className="list--link"
                    >
                      <li
                        className="list--item"
                        style={{
                          animationDelay: i < 15 ? `${20 * i}ms` : '0ms',
                        }}
                      >
                        {gurmukhiUni}{' '}
                        {transliterationLanguages.includes('english') &&
                          `- ${SundarGutka.sanitize(transliteration)}`}
                      </li>
                    </Link>
                  )
                )}
            </ul>
          </div>
        );
      } else {
        content = (
          <Route
            path={this.props.match.url + '/:currentBaaniId'}
            component={Baani}
          />
        );
      }
    }

    return (
      <div className="row" id="content-root">
        <BreadCrumb links={links} />
        <div id="help">{content}</div>
      </div>
    );
  }

  public handleSearch = (e: ChangeEvent) =>
    this.setState({ q: e.currentTarget.value });

  public componentDidUpdate({
    match: { isExact: wasExact },
  }: SundarGutkaProps) {
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
      .then((baanies: BaaniType[]) =>
        this.setState({
          baanies,
          currentBaaniId: baanies[0].ID,
        })
      );
  }
}

export default connect(({ transliterationLanguages }: Store) => ({
  transliterationLanguages,
}))(SundarGutka);
