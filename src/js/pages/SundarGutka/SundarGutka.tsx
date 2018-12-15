/* globals BANIS_API_URL */
import React, { ChangeEventHandler } from 'react';
import { Route, Link } from 'react-router-dom';
import { pageView } from '../../util/analytics';
import Baani from './Baani';
import { TEXTS } from '@/constants';
import BreadCrumb from '@/components/Breadcrumb';
import Android from '@/components/Icons/Android';
import AppleiOS from '@/components/Icons/AppleiOS';
import { State } from '@/features/types';
import { BaaniType } from '@/types';

export interface ISundarGutkaProps {
  transliterationLanguages: State['transliterationLanguages'];
  location: { hash: string };
  match: {
    isExact: boolean;
    url: string;
  };
}

export default class SundarGutka extends React.PureComponent<
  ISundarGutkaProps,
  { baanies: BaaniType[] | null; q: string; currentBaaniId?: string }
> {
  public static filter = (q: string) => (i: BaaniType) =>
    q === '' ||
    SundarGutka.sanitize(i.transliteration)
      .toLowerCase()
      .includes(q.toLocaleLowerCase());

  public static sanitize = (t: string) => t.replace(/\(n\)/gi, 'n');

  public static HOME_LINKS = [{ title: TEXTS.URIS.SUNDAR_GUTKA }];
  public static BAANI_LINKS = [
    { url: '/sundar-gutka', title: TEXTS.URIS.SUNDAR_GUTKA },
    { title: TEXTS.URIS.SUNDAR_GUTKA_BAANI },
  ];

  public state = {
    baanies: null,
    q: '',
  };

  private $details = React.createRef();

  private handleSearch: ChangeEventHandler<HTMLInputElement> = e =>
    this.setState({ q: e.currentTarget.value });

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
                {(baanies || [])
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
                          animationDelay: i < 15 ? `${20 * i}ms` : '0',
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

  public componentDidUpdate({
    match: { isExact: wasExact },
  }: ISundarGutkaProps) {
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
