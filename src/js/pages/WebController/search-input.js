import React from 'react';
// import PropTypes from 'prop-types';
import CrossIcon from '../../components/Icons/Times';
import KeyboardIcon from '../../components/Icons/Keyboard';
import SearchIcon from '../../components/Icons/Search';
// import SlideControls from './slide-controls';
import EnhancedGurmukhiKeyboard from '../../components/GurmukhiKeyboardv2';
import SearchForm from '../../components/SearchForm';

import {
  SOURCES,
  SEARCH_TYPES,
  TYPES,
  SOURCES_WITH_ANG,
  LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE,
  DEFAULT_SEARCH_TYPE,
  LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE,
  DEFAULT_SEARCH_SOURCE,
} from '../../constants';

import { getNumberFromLocalStorage } from '../../util';
import ControllerSearch from './search';

export default class SearchInput extends React.PureComponent {
  // static propTypes = {
  //   socket: PropTypes.object
  // };

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      type:
        getNumberFromLocalStorage(
          LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE,
          DEFAULT_SEARCH_TYPE
        ),
      source:
        localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE) ||
        DEFAULT_SEARCH_SOURCE,
      offset: 0,
    };
  }

  onSubmit = ({ handleSubmit, query, type, source }) => e => {
    e.preventDefault();
    handleSubmit();
    this.setState({ query, type, source, offset: 0, });
  };

  render() {
    return (
      <SearchForm>
        {({
          pattern,
          title,
          className,
          displayGurmukhiKeyboard,
          query,
          type,
          inputType,
          source,
          action,
          name,
          placeholder,
          setGurmukhiKeyboardVisibilityAs,
          setQueryAs,
          handleSearchChange,
          handleSearchSourceChange,
          handleSubmit,
          handleSearchTypeChange,
        }) => (
            <React.Fragment>
              <div className="row" id="content-root">
                <div className="search-page">
                  <form
                    className="search-form"
                    action={action}
                    onSubmit={this.onSubmit({
                      handleSubmit,
                      query,
                      type,
                      source,
                    })}
                  >

                    <div id="search-container" className={displayGurmukhiKeyboard ? "kb-active" : ''}>
                      <input
                        autoFocus={true}
                        name={name}
                        id="search"
                        type={inputType}
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        required="required"
                        value={query}
                        onChange={handleSearchChange}
                        className={className}
                        placeholder={placeholder}
                        title={title}
                        pattern={pattern}
                      />
                      <button
                        type="button"
                        className="clear-search-toggle"
                        onClick={setQueryAs('')}
                      >
                        <CrossIcon />
                      </button>
                      {type > 2 ? '' : (
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
                        searchType={type}
                        active={displayGurmukhiKeyboard}
                        onKeyClick={newValue => setQueryAs(newValue)()}
                        onClose={setGurmukhiKeyboardVisibilityAs(false)}
                      />
                    </div>
                    <div className="search-options">
                      <div className="search-option">
                        <select
                          name="type"
                          id="search-type"
                          value={type}
                          onChange={handleSearchTypeChange}
                        >
                          {TYPES.map((children, value) => (
                            <option key={value} value={value}>
                              {children}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="search-option">
                        {type === SEARCH_TYPES['ANG'] ? (
                          <select
                            name="source"
                            value={Object.keys(SOURCES_WITH_ANG).includes(source) ? source : 'G'}
                            onChange={handleSearchSourceChange}
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
                            >
                              {Object.entries(SOURCES).map(([value, children]) => (
                                <option key={value} value={value}>
                                  {children}
                                </option>
                              ))}
                            </select>
                          )
                        }
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* <SlideControls /> */}
              {this.state.query && (
                <ControllerSearch
                  q={this.state.query}
                  type={this.state.type}
                  source={this.state.source}
                  offset={this.state.offset}
                />
              )}
            </React.Fragment>
          )}
      </SearchForm>
    )
  }
}