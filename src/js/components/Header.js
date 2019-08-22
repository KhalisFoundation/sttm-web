import React from 'react';
import PropTypes from 'prop-types';
import { SOURCES, SEARCH_TYPES, TYPES } from '../constants';
import { Link } from 'react-router-dom';
import GurmukhiKeyboard from './GurmukhiKeyboard';
import EnhancedGurmukhiKeyboard from './GurmukhiKeyboardv2';
import SearchForm from './SearchForm';
import { toSearchURL, getQueryParams } from '../util';
import CrossIcon from './Icons/Times';
import Menu from './HeaderMenu';
import KeyboardIcon from './Icons/Keyboard';
import SearchIcon from './Icons/Search';
export default class Header extends React.PureComponent {
  static defaultProps = { isHome: false, location: { search: '' } };

  static propTypes = {
    defaultQuery: PropTypes.string,
    isHome: PropTypes.bool,
    isAng: PropTypes.bool,
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    history: PropTypes.shape({ push: PropTypes.func }),
  };

  onFormSubmit = ({ handleSubmit, ...data }) => e => {
    e.preventDefault();
    handleSubmit();
    this.handleFormSubmit(data);
  };

  handleFormSubmit = data => this.props.history.push(toSearchURL(data));

  render() {
    const {
      props: { defaultQuery, isHome, isAng },
      onFormSubmit,
      handleFormSubmit,
    } = this;
    const {
      source: defaultSource = null,
      type: defaultType = isAng ? SEARCH_TYPES.ANG : null,
    } = getQueryParams(location.search);

    const key = `${defaultQuery}${defaultSource}${defaultType}`;

    return (
      <div className={`top-bar no-select ${isHome ? 'top-bar-naked' : ''}`}>
        <div className="top-bar-wrapper row">
          {!isHome && (
            <div className="top-bar-title">
              <Link to="/" />
            </div>
          )}
          <SearchForm
            key={key}
            defaultQuery={defaultQuery}
            defaultSource={defaultSource}
            defaultType={defaultType}
            submitOnChangeOf={['type', 'source']}
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
              action,
              name,
              placeholder,
              setGurmukhiKeyboardVisibilityAs,
              setQueryAs,
              handleSearchChange,
              handleSearchSourceChange,
              handleSearchTypeChange,
              handleSubmit,
            }) => (
              <React.Fragment>
                <div id="responsive-menu">
                  <div className="top-bar-left">
                    {!isHome && (
                      <form
                        action={action}
                        id="top-bar-search-form"
                        onSubmit={onFormSubmit({
                          handleSubmit,
                          type,
                          source,
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
                            <div id="search-container">
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
                              />

                              <button
                                type="button"
                                className="clear-search-toggle"
                                onClick={setQueryAs('')}
                              >
                                <CrossIcon />
                              </button>

                              <button
                                className={`gurmukhi-keyboard-toggle ${
                                  displayGurmukhiKeyboard ? 'active' : ''
                                }`}
                                type="button"
                                onClick={setGurmukhiKeyboardVisibilityAs(
                                  !displayGurmukhiKeyboard
                                )}
                              >
                                <KeyboardIcon />
                              </button>

                              <button type="submit">
                                <SearchIcon />
                              </button>

                              <EnhancedGurmukhiKeyboard
                                value={query}
                                active={displayGurmukhiKeyboard}
                                onKeyClick={newValue => setQueryAs(newValue)()}
                                onClose={setGurmukhiKeyboardVisibilityAs(false)}
                              />
                            </div>
                          </li>
                        </ul>
                      </form>
                    )}
                  </div>
                  <Menu />
                </div>
                {!isHome && (
                  <div id="search-options">
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
                  </div>
                )}
              </React.Fragment>
            )}
          </SearchForm>
        </div>
      </div>
    );
  }
}
