import React from 'react';
import PropTypes from 'prop-types';
import { SOURCES, TYPES } from 'shabados';
import { toSearchURL } from '../../util';
import { pageView } from '../../util/analytics';
import GurmukhiKeyboard from '../../components/GurmukhiKeyboard';
import SearchForm from '../../components/SearchForm';
import Doodle from '../../components/Doodle';
import Logo from '../../components/Icons/Logo';
import CrossIcon from '../../components/Icons/Times';
import KeyboardIcon from '../../components/Icons/Keyboard';
import SearchIcon from '../../components/Icons/Search';

const types = [...TYPES, 'Ang'];

export default class Home extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }),
  };

  onSubmit = ({ handleSubmit, ...data }) => e => {
    e.preventDefault();
    handleSubmit();
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
                  <div className="flex justify-center align-center">
                    <div>
                      <Doodle href="https://www.instagram.com/dilmeet.kaur/" src="2018-04-14-vaisakhi-dilmeet-kaur.png" />
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
                      <CrossIcon />
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
                      <KeyboardIcon />
                    </button>
                    <button data-test-id="search-button" type="submit">
                      <SearchIcon />
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

  componentDidMount() {
    pageView('/');
  }
}
