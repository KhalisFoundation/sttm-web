/* globals DOODLE_URL */

import React from 'react';
import PropTypes from 'prop-types';
import {
  SEARCH_TYPES,
  MAX_ANGS,
} from '../constants';
import { Link } from 'react-router-dom';
import EnhancedGurmukhiKeyboard from './GurmukhiKeyboardv2';
import SearchForm from './SearchForm';
import { toSearchURL, getQueryParams, getShabadList } from '../util';
import CrossIcon from './Icons/Times';
import Menu from './HeaderMenu';
import KeyboardIcon from './Icons/Keyboard';
import SearchIcon from './Icons/Search';
import Autocomplete from '@/components/Autocomplete';
import { FilterTypes } from '@/components/FilterTypes';
export default class Header extends React.PureComponent {
  static defaultProps = { isHome: false, location: { search: '' } };

  static propTypes = {
    defaultQuery: PropTypes.string,
    isHome: PropTypes.bool,
    isController: PropTypes.bool,
    isAng: PropTypes.bool,
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    history: PropTypes.shape({ push: PropTypes.func }),
  };

  state = {
    showDoodle: false,
    doodleData: null,
  };

  fetchDoodle = () => {
    fetch(`${DOODLE_URL}`)
      .then((r) => r.json())
      .then(
        (data) => {
          if (data.error) {
            this.setState({ showDoodle: false, doodleData: null });
          } else if (data.rows.length) {
            this.setState({ showDoodle: true, doodleData: data.rows[0] });
          }
        },
        (error) => {
          console.log(error);
          this.setState({ showDoodle: false, doodleData: null });
        }
      );
  };

  componentDidMount() {
    this.fetchDoodle();
  }

  onFormSubmit = ({ handleSubmit, ...data }) => (e) => {
    console.log(e, 'EVENT CODE');
    e.preventDefault();
    handleSubmit();
    this.handleFormSubmit(data);
  };

  handleApplyFiltersClick = (data) => () => {
    this.handleFormSubmit(data);
  }

  handleFormSubmit = (data) => {
    console.log(toSearchURL(data), '>>>>>>>>>>>>>>>>> :( ');
    this.props.history.push(toSearchURL(data));
  };

  componentWillUnmount = () => {
    console.log('THIS IS UNMOUNTING...');
  };

  render() {
    const {
      props: { defaultQuery, isHome, isAng, isController },
      state: { showDoodle, doodleData },
      onFormSubmit,
      handleFormSubmit,
      handleApplyFiltersClick,
    } = this;

    const {
      source: defaultSource = null,
      type: defaultType = isAng ? SEARCH_TYPES.ANG.toString() : null,
      raag: defaultRaag = null,
      writer: defaultWriter = null,
    } = getQueryParams(location.search);

    const id = `${defaultQuery}${defaultSource}${defaultType}${defaultRaag}${defaultWriter}`;

    // console.log(key, "key updated ?")
    const controllerHeader = (
      <div className="top-bar no-select" id="controller-bar">
        <div className="top-bar-wrapper row controller-header">
          <div className="top-bar-title">
            <Link id="sync-logo" to="/" />
            <span className="logo-text">
              <span className="bolder">Bani</span> Controller
            </span>
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
      <div
        id="nav-bar"
        className={`top-bar no-select ${isHome ? 'top-bar-naked' : ''}`}
      >
        <div className="top-bar-wrapper row">
          {!isHome && (
            <div className="top-bar-title">
              {showDoodle ? (
                <>
                  <Link
                    to="/"
                    title={doodleData['Description']}
                    className="doodle-link icon"
                    style={{
                      backgroundImage: `url(${doodleData['ImageSquare']}) `,
                    }}
                  />
                  <Link
                    to="/"
                    title={doodleData['Description']}
                    className="doodle-link bigger-image"
                    style={{ backgroundImage: `url(${doodleData['Image']}) ` }}
                  />
                </>
              ) : (
                  <Link to="/" />
                )}
            </div>
          )}
          <SearchForm
            id={id}
            // key={key}
            defaultQuery={defaultQuery && decodeURIComponent(defaultQuery)}
            defaultRaag={parseInt(defaultRaag, 10)}
            defaultSource={defaultSource}
            defaultType={parseInt(defaultType, 10)}
            defaultWriter={parseInt(defaultWriter, 10)}
            submitOnChangeOf={['type', 'source', 'raag', 'writer']}
            onSubmit={handleFormSubmit}
          >
            {({
              pattern,
              title,
              className,
              inputType,
              displayGurmukhiKeyboard,
              query,
              type,
              source,
              raag,
              writer,
              action,
              name,
              placeholder,
              setGurmukhiKeyboardVisibilityAs,
              setQueryAs,
              handleSearchChange,
              handleSearchSourceChange,
              handleSearchTypeChange,
              handleSearchRaagChange,
              handleSearchWriterChange,
              handleSubmit,
            }) => (
                <React.Fragment>
                  {console.log(query, 'new query....')}
                  <div id="responsive-menu">
                    <div className="top-bar-left">
                      {!isHome && (
                        <>
                          <form
                            action={action}
                            id="top-bar-search-form"
                            onSubmit={onFormSubmit({
                              handleSubmit,
                              type,
                              source,
                              raag,
                              writer,
                              query,
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
                                  hidden
                                />
                              </li>
                              <li>
                                <input
                                  name="source"
                                  defaultValue={source}
                                  className="hidden"
                                  id="search-source-value"
                                  hidden
                                />
                              </li>
                              <li>
                                <div
                                  id="search-container"
                                  className={
                                    displayGurmukhiKeyboard ? 'kb-active' : ''
                                  }
                                >
                                  <input
                                    type={inputType}
                                    id="search"
                                    autoComplete="off"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    required="required"
                                    name={name}
                                    value={query}
                                    onChange={handleSearchChange}
                                    className={className}
                                    placeholder={placeholder}
                                    title={title}
                                    pattern={pattern}
                                    min={name === 'ang' ? 1 : undefined}
                                    max={
                                      name === 'ang'
                                        ? MAX_ANGS[source]
                                        : undefined
                                    }
                                  />

                                  <button
                                    type="button"
                                    className="clear-search-toggle"
                                    onClick={setQueryAs('')}
                                  >
                                    <CrossIcon />
                                  </button>

                                  {type > 2 ? (
                                    ''
                                  ) : (
                                      <button
                                        type="button"
                                        className={`gurmukhi-keyboard-toggle ${
                                          displayGurmukhiKeyboard ? 'active' : ''
                                          }`}
                                        onClick={setGurmukhiKeyboardVisibilityAs(
                                          !displayGurmukhiKeyboard
                                        )}
                                      >
                                        <KeyboardIcon />
                                      </button>
                                    )}

                                  <button type="submit">
                                    <SearchIcon />
                                  </button>

                                  <EnhancedGurmukhiKeyboard
                                    value={query}
                                    searchType={parseInt(type)}
                                    active={displayGurmukhiKeyboard}
                                    onKeyClick={(newValue) =>
                                      setQueryAs(newValue)()
                                    }
                                    onClose={setGurmukhiKeyboardVisibilityAs(
                                      false
                                    )}
                                  />

                                  <Autocomplete
                                    onItemClick={() => setQueryAs('')}
                                    getSuggestions={getShabadList}
                                    searchOptions={{
                                      type: parseInt(type),
                                      source,
                                      raag: parseInt(raag),
                                      writer: parseInt(writer),
                                    }}
                                    value={query}
                                  />
                                </div>
                              </li>
                            </ul>
                          </form>
                          <div
                            id="search-options"
                            className="searchPageFilters"
                          >
                            <FilterTypes
                              filterType={type}
                              filterSource={source}
                              filterRaag={raag}
                              filterWriter={writer}
                              onFilterTypeChange={handleSearchTypeChange}
                              onFilterSourceChange={handleSearchSourceChange}
                              onFilterRaagChange={handleSearchRaagChange}
                              onFilterWriterChange={handleSearchWriterChange}
                            />
                          </div>
                          <div
                            className="searchPageFiltersBtnWrapper">
                            <button
                              onClick={handleApplyFiltersClick({
                                type,
                                source,
                                raag,
                                writer,
                                query,
                              })}
                              className="primaryBtn searchPageFiltersBtn">
                              Apply filters
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <Menu isHome={isHome} />
                  </div>
                </React.Fragment>
              )}
          </SearchForm>
        </div>
      </div >
    );
  }
}
