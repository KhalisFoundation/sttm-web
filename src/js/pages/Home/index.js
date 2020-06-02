/* globals DOODLE_URL */

import React from 'react';
import PropTypes from 'prop-types';
import { SOURCES, SEARCH_TYPES, TYPES, SOURCES_WITH_ANG } from '../../constants';
import { toSearchURL, getShabadList, dateMath } from '../../util';
import { pageView } from '../../util/analytics';
import EnhancedGurmukhiKeyboard from '../../components/GurmukhiKeyboardv2';
import SehajPaathLink from '../../components/SehajPaathLink';
import SearchForm from '../../components/SearchForm';
import Logo from '../../components/Icons/Logo';
import CrossIcon from '../../components/Icons/Times';
import KeyboardIcon from '../../components/Icons/Keyboard';
import SearchIcon from '../../components/Icons/Search';
import Autocomplete from '@/components/Autocomplete';
/**
 *
 *
 * @export
 * @class Home
 * @extends {React.PureComponent}
 */
export default class Home extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }),
  };

  state = {
    showDoodle: false,
    doodleData: null
  }

  fetchDoodle = () => {
    fetch(`${DOODLE_URL}`)
      .then(r => r.json())
      .then((data) => {
        if (data.rows.length) {
          this.setState({ showDoodle: true, doodleData: data.rows[0] });
        }
      }, (error) => {
        console.log(error);
        this.setState({ showDoodle: false, doodleData: null });
      }
      );
  }

  onSubmit = ({ handleSubmit, ...data }) => e => {
    e.preventDefault();
    handleSubmit();
    this.props.history.push(toSearchURL(data));
  };

  /**
   * Functional component
   */
  render() {
    const { showDoodle, doodleData } = this.state;

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
                <div className={showDoodle ?
                  "search-page doodle-logo-page" : "search-page"}>
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
                    <div className="flex justify-center align-center">
                      <div>
                        {showDoodle ? (
                          <Logo className="logo-long" doodle={doodleData} />
                        ) : (<Logo className="logo-long" />)}
                      </div>
                    </div>

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
                    <Autocomplete
                      getSuggestions={getShabadList}
                      searchOptions={{ type, source }}
                      value={query}
                    />
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
                    <SehajPaathLink />
                  </form>
                </div>
              </div>
              {showDoodle && (
                <a href={doodleData['SourceLink']} target="_blank">
                  <p className="doodle-credit">Special thanks to {doodleData['SourceText']}</p>
                </a>
              )}
            </React.Fragment>
          )}
      </SearchForm>
    );
  }

  componentDidMount() {
    pageView('/');
    this.fetchDoodle();
  }
}
