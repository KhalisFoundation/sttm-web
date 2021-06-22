import React from 'react';
import PropTypes from 'prop-types';
import { SOURCES, SEARCH_TYPES, TYPES, SOURCES_WITH_ANG, MAX_ANGS, SOURCE_WRITER_FILTER, TEXTS } from '../constants';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { EnhancedGurmukhiKeyboard } from './EnhancedGurmukhiKeyboard';
import SearchForm from './SearchForm';
import Menu from './HeaderMenu';
import SearchIcon from './Icons/Search';
import Reset from './Icons/Reset';
import Autocomplete from '@/components/Autocomplete';
import ClearSearchButton from '@/components/ClearSearchButton';
import GurmukhiKeyboardToggleButton from '@/components/GurmukhiKeyboardToggleButton';
import { toggleSettingsPanel } from '@/features/actions';

import {
  toSearchURL,
  getQueryParams,
  getShabadList,
  reformatSearchTypes,
  isShowSehajPaathModeRoute
} from '@/util';

const { BACK_TO_HOME } = TEXTS;

class Header extends React.PureComponent {
  static defaultProps = { isHome: false, location: { search: '' } };

  static propTypes = {
    defaultQuery: PropTypes.string,
    isHome: PropTypes.bool,
    isController: PropTypes.bool,
    isAng: PropTypes.bool,
    fullScreenMode: PropTypes.bool,
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    history: PropTypes.shape({ push: PropTypes.func }),
    toggleSettingsPanel: PropTypes.func,
  };

  state = {
    showDoodle: false,
    doodleData: null,
  }

  fetchDoodle = () => {
    fetch(`${DOODLE_URL}`)
      .then(r => r.json())
      .then((data) => {
        if (data.error) {
          this.setState({ showDoodle: false, doodleData: null });
        } else if (data.rows.length) {
          this.setState({ showDoodle: true, doodleData: data.rows[0] });
        }
      }, (error) => {
        console.log(error);
        this.setState({ showDoodle: false, doodleData: null });
      }
      );
  }
  componentDidMount() {
    this.fetchDoodle();
  }

  onFormSubmit = ({ handleSubmit, ...data }) => e => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit();
    this.handleFormSubmit(data);
  };

  handleFormSubmit = data => {
    this.props.history.push(toSearchURL(data));
  }

  render() {
    const {
      props: { defaultQuery, isHome, isAng, fullScreenMode, isController },
      state: { showDoodle, doodleData },
      onFormSubmit,
      handleFormSubmit,
    } = this;

    if (fullScreenMode) {
      return null;
    }

    const {
      source: defaultSource = null,
      type: defaultType = isAng ? SEARCH_TYPES.ANG.toString() : null,
    } = getQueryParams(location.search);

    const isSearchPageRoute = location.pathname.includes('search');
    const key = `${defaultQuery}${defaultSource}${defaultType}`;

    const controllerHeader = (
      <div className="top-bar no-select" id="controller-bar">
        <div className="top-bar-wrapper row controller-header">
          <div className="top-bar-title">
            <Link id="sync-logo" to="/" aria-label="back to home" />
            <span className="logo-text"><span className="bolder">Bani</span> Controller</span>
          </div>
          <div className="responsive-menu">
            <Menu isHome={true} />
          </div>
        </div>
      </div>
    );

    if (isController) {
      return controllerHeader;
    }

    return (
      <div id="nav-bar" className={`top-bar no-select ${isHome ? 'top-bar-naked' : ''}`}>
        <div className="top-bar-wrapper row">          
          <SearchForm
            key={key}
            defaultQuery={defaultQuery && decodeURIComponent(defaultQuery)}
            defaultSource={defaultSource}
            defaultType={Number(defaultType)}
            submitOnChangeOf={['type', 'source', 'writer']}
            onSubmit={handleFormSubmit}
          >
            {({
              pattern,
              disabled,
              title,
              className,
              inputType,
              displayGurmukhiKeyboard,
              isShowKeyboard,
              query,
              type,
              source,
              writer,
              writers,
              action,
              name,
              placeholder,
              setGurmukhiKeyboardVisibilityAs,
              setQueryAs,
              isSourceChanged,
              isWriterChanged,
              handleKeyDown,
              handleSearchChange,
              handleSearchSourceChange,
              handleSearchTypeChange,
              handleSearchWriterChange,
              handleSubmit,
              handleReset,
            }) => {

              return (
                <React.Fragment>
                  <div className="top-bar-title">
                    {showDoodle ?
                      (<>
                        <Link to="/" title={doodleData['Description']} className="doodle-link icon"
                          style={{ backgroundImage: `url(${doodleData['ImageSquare']}) ` }}>
                          {BACK_TO_HOME}
                        </Link>
                        <Link to="/" title={doodleData['Description']} className="doodle-link bigger-image"
                          style={{ backgroundImage: `url(${doodleData['Image']}) ` }}>
                          {BACK_TO_HOME}
                        </Link>
                      </>) :
                      (<Link to="/" className="transparent-color">{BACK_TO_HOME}</Link>)
                    }
                  </div>
                  <div className="top-bar-menu">
                    <div id="responsive-menu">
                      <div className="top-bar-left">
                        {!isHome && (
                          <>
                            <form
                              noValidate="novalidate"
                              action={action}
                              id="top-bar-search-form"
                              onSubmit={onFormSubmit({
                                handleSubmit,
                                type,
                                source,
                                query,
                                writer
                              })}
                              className="search-form"
                            >
                              <ul className="menu">
                                <li>
                                  <input
                                    name="type"
                                    className="hidden"
                                    defaultValue={type}
                                    id="search-type-value"
                                    type="hidden"
                                    hidden
                                  />
                                </li>
                                <li>
                                  <input
                                    name="source"
                                    defaultValue={source}
                                    className="hidden"
                                    type="hidden"
                                    id="search-source-value"
                                    hidden
                                  />
                                </li>
                                <li>
                                  <div id="search-container" className={displayGurmukhiKeyboard ? "kb-active" : ''}>
                                    <input
                                      type={inputType}
                                      id="search"
                                      autoComplete="off"
                                      autoCapitalize="none"
                                      autoCorrect="off"
                                      spellCheck={false}
                                      required="required"
                                      name={name}
                                      value={query}
                                      onKeyDown={handleKeyDown}
                                      onChange={handleSearchChange}
                                      className={className}
                                      placeholder={placeholder}
                                      title={title}
                                      pattern={pattern}
                                      min={name === 'ang' ? 1 : undefined}
                                      max={name === 'ang' ? MAX_ANGS[source] : undefined}
                                    />
                                    <ClearSearchButton clickHandler={setQueryAs} />
                                    {isShowKeyboard && <GurmukhiKeyboardToggleButton clickHandler={setGurmukhiKeyboardVisibilityAs} isVisible={displayGurmukhiKeyboard} />}

                                    <button
                                      type="submit"
                                      disabled={disabled}
                                      aria-label="search"
                                    >
                                      <SearchIcon />
                                    </button>

                                    {isShowKeyboard && (
                                      <EnhancedGurmukhiKeyboard
                                        value={query}
                                        searchType={parseInt(type)}
                                        active={displayGurmukhiKeyboard}
                                        onKeyClick={newValue => setQueryAs(newValue)()}
                                        onClose={setGurmukhiKeyboardVisibilityAs(false)}
                                      />
                                    )}

                                    <Autocomplete
                                      isShowFullResults={(!isSearchPageRoute) || (isSearchPageRoute && decodeURI(defaultQuery) !== query)}
                                      getSuggestions={getShabadList}
                                      searchOptions={{ type: parseInt(type), source, writer }}
                                      value={query}
                                      isHome={isHome}
                                    />
                                  </div>
                                </li>
                              </ul>
                            </form>
                          </>
                        )}
                      </div>
                      <Menu
                        isHome={isHome}
                      />
                    </div>
                    {!isHome && (
                      <div id="search-options">
                        <select
                          name="type"
                          id="search-type"
                          value={type.toString()}
                          onChange={handleSearchTypeChange}
                        >
                          {reformatSearchTypes(TYPES).map(({ type, value }) => (
                            <option key={value} value={value}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {parseInt(type) === SEARCH_TYPES['ANG'] ? (
                          <select
                            name="source"
                            value={Object.keys(SOURCES_WITH_ANG).includes(source) ? source : 'G'}
                            onChange={handleSearchSourceChange}
                            className={[isSourceChanged ? 'selected' : null]}
                          >
                            {Object.entries(SOURCES_WITH_ANG).map(([value, children]) => (
                              <option key={value} value={value}>
                                {children}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <select
                            name="source"
                            value={source}
                            onChange={handleSearchSourceChange}
                            className={[isSourceChanged ? 'selected' : null]}
                          >
                            {Object.entries(SOURCES).map(([value, children]) => (
                              <option key={value} value={value}>
                                {children}
                              </option>
                            ))}
                          </select>)}
                        <select
                          name="writer"
                          value={writer}
                          onChange={handleSearchWriterChange}
                          className={[isWriterChanged ? 'selected' : null]}>
                          {
                            writers?.filter(e =>
                              source === 'G' || source === 'A' ? !SOURCE_WRITER_FILTER[source].includes(e.writerID)
                                : source !== 'all' ? SOURCE_WRITER_FILTER[source].includes(e.writerID)
                                  : true
                            ).map(writer => (
                              <option key={writer.writerID} value={writer.writerID}>
                                {writer.writerEnglish}
                              </option>
                            ))
                          }
                        </select>
                        <button
                          className="reset"
                          onClick={handleReset}
                          title="Reset"
                          aria-label="Reset">
                          <Reset />
                        </button>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              )
            }}
          </SearchForm>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ fullScreenMode }) => ({ fullScreenMode })

const mapDispatchToProps = {
  toggleSettingsPanel,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
