import React from 'react';
import PropTypes from 'prop-types';
import { SOURCES, TYPES } from 'shabados';
import { toSearchURL } from '../../util';
import GurmukhiKeyboard from '../../components/GurmukhiKeyboard';
import SearchForm from '../../components/SearchForm';
import Logo from '../../components/Logo';

const types = [...TYPES, 'Ang'];

export default class Home extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }),
  };

  onSubmit = data => e => {
    e.preventDefault();
    this.props.history.push(toSearchURL(data));
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
          source,
          action,
          name,
          placeholder,
          isAnimatingPlaceholder,
          setGurmukhiKeyboardVisibilityAs,
          setQueryAs,
          handleSearchChange,
          handleSearchSourceChange,
          handleSearchTypeChange,
        }) => (
          <React.Fragment>
            <div className="row" id="content-root">
              <div className="search-page">
                <form
                  className="search-form"
                  action={action}
                  onSubmit={this.onSubmit({ query, type, source })}
                >
                  <div className="flex justify-center align-center">
                    <div>
                      <Logo className="logo-long" />
                    </div>
                  </div>

                  <div id="search-container">
                    <input
                      autoFocus="true"
                      name={name}
                      id="search"
                      type="search"
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
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
                      <i className="fa fa-times" />
                    </button>
                    <button
                      type="button"
                      className={`gurmukhi-keyboard-toggle ${
                        displayGurmukhiKeyboard ? 'active' : ''
                      }`}
                      onClick={setGurmukhiKeyboardVisibilityAs(
                        !displayGurmukhiKeyboard
                      )}
                    >
                      <i className="fa fa-keyboard-o" />
                    </button>
                    <button type="submit">
                      <i className="fa fa-search" />
                    </button>
                    <GurmukhiKeyboard
                      value={query}
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
                        disabled={isAnimatingPlaceholder}
                      >
                        {types.map((children, value) => (
                          <option key={value} value={value}>
                            {children}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="search-option">
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
                  </div>
                </form>
              </div>
            </div>
          </React.Fragment>
        )}
      </SearchForm>
    );
  }
}
