/* globals BANIS_API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SmartBanner from 'react-smartbanner';

import { RenderShabads } from '@/components/RenderShabads';
import BreadCrumb from '@/components/Breadcrumb';
import { SundarGutkaHeader } from './SundarGutkaHeader';
import { TEXTS, SG_BAANIS, SG_MULTIPLE_VERSION_BAANIS } from '@/constants';
import { setSgBaaniLength } from '@/features/actions';
import { pageView } from '@/util/analytics';
import { sanitizeBaani, baaniNameToIdMapper } from './utils';
class SundarGutka extends React.PureComponent {
  static propTypes = {
    transliterationLanguages: PropTypes.array.isRequired,
    location: PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
    }),
    match: PropTypes.object.isRequired,
  };

  static HOME_LINKS = [{ title: TEXTS.URIS.SUNDAR_GUTKA }];

  static BAANI_LINKS = [
    { url: '/sundar-gutka', title: TEXTS.URIS.SUNDAR_GUTKA },
    { title: TEXTS.URIS.SUNDAR_GUTKA_BAANI },
  ];

  state = {
    baanies: null,
    q: '',
  };

  render() {
    const {
      props: {
        location: { pathname },
        match: { isExact: isSundarGutkaHome },
        transliterationLanguages,
        sgBaaniLength,
        setSgBaaniLength,
      },
      state: { baanies, q },
    } = this;

    const links = isSundarGutkaHome
      ? SundarGutka.HOME_LINKS
      : SundarGutka.BAANI_LINKS;

    //eg /sundar-gutka/japji-sahib, get japji-sahib from this
    const baaniIdOrName = pathname.split('/')[2];
    const baaniId = baanies ? baaniNameToIdMapper(baanies, baaniIdOrName) : baaniIdOrName;

    return (
      <div className="row" id="content-root">
        <SmartBanner key="sundarGutka" title={'Sundar Gutka'} />
        <BreadCrumb links={links} />
        <div id="help">
          {baanies === null ? (
            <div className="spinner" />
          ) : isSundarGutkaHome ? (
            <>
              <div className="wrapper" style={{ width: '100%' }}>
                <SundarGutkaHeader
                  sgBaaniLength={sgBaaniLength}
                  setSgBaaniLength={setSgBaaniLength}
                />
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
              <div className="sgCards">
                {baanies
                  .filter(SundarGutka.filter(q))
                  .map(({ ID, transliteration, gurmukhiUni }, i) => {
                    const isMultipleVersionExists = SG_MULTIPLE_VERSION_BAANIS.some(bId => bId == ID)
                    return (
                      <Link
                        to={`/sundar-gutka/${sanitizeBaani(transliteration).split(' ').join('-')}`}
                        key={ID}
                      >
                        <div
                          className="sgCard"
                          style={{
                            animationDelay: i < 15 ? `${20 * i}ms` : 0,
                          }}
                        >
                          <h2
                            className="sgCardGurmukhi"
                          >{gurmukhiUni}{' '}</h2>

                          <div
                            className="sgCardEnglish"
                          >
                            {isMultipleVersionExists &&
                              <div className="sgBaanisVersions">
                                {SG_BAANIS.map(({ length }) => {
                                  if (length == sgBaaniLength)
                                    return <div key={length} className='sgBaanisVersion sgBaanisVersionSelected'>{length}</div>
                                  return null;
                                })}
                              </div>}
                            {transliterationLanguages.includes('english') &&
                              `${sanitizeBaani(transliteration)}`}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
              </div>
            </>
          ) : (
            <Route
              path={this.props.match.url + '/:baaniIdOrName'}
              render={routeProps => <RenderShabads sundarGutkaBaaniId={baaniId} {...routeProps} />}
            />
          )}
        </div>
      </div >
    );
  }

  static filter = q => i =>
    q === '' ||
    SundarGutka.sanitize(i.transliteration)
      .toLowerCase()
      .includes(q.toLocaleLowerCase());

  static sanitize = t => t.replace(/\(n\)/gi, 'n');

  handleSearch = e => this.setState({ q: e.currentTarget.value });

  componentDidUpdate({
    match: { isExact: wasExact },
    location: { pathname: prevLocation },
  }) {
    if (wasExact === false && this.props.match.isExact) {
      pageView('/sundar-gutka');
    }
    if (prevLocation !== this.props.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
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

const mapStateToProps = ({ transliterationLanguages, sgBaaniLength }) => ({
  transliterationLanguages,
  sgBaaniLength
})

const mapDispatchToProps = {
  setSgBaaniLength
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SundarGutka);
