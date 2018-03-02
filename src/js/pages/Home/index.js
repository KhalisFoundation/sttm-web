import React from 'react';
import { SOURCES, TYPES } from 'shabados';
import GurmukhiKeyboard from '../../components/GurmukhiKeyboard'
import SearchForm  from '../../components/SearchForm';

const types = [...TYPES, 'Ang'];

export default class Home extends React.PureComponent {
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
          handleSubmit,
        }) => (
          <React.Fragment>
            <div className="row" id="content-root">
              <div className="search-page">
                <form
                  className="search-form"
                  action={action}
                  onSubmit={handleSubmit}
                >
                  <div className="flex justify-center align-center">
                    <div>
                      <img
                        className="logo-long"
                        src="/assets/images/sttm_logo.png"
                        alt="SikhiToTheMax Logo"
                      />
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
                    <button type="button" className="clear-search-toggle" onClick={setQueryAs('')}>
                      <i className="fa fa-times" />
                    </button>
                    <button
                      type="button"
                      className="gurmukhi-keyboard-toggle"
                      onClick={setGurmukhiKeyboardVisibilityAs(!displayGurmukhiKeyboard)}
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
                  <div className="row search-options">
                    <div className="small-6 columns">
                      <select name="type" id="search-type" value={type} onChange={handleSearchTypeChange} disabled={isAnimatingPlaceholder}>
                        {
                          types
                            .map((children, value) =>
                              <option key={value} value={value}>{children}</option>,
                            )
                        }
                      </select>
                    </div>
                    <div className="small-6 columns">
                      <select name="source" value={source} onChange={handleSearchSourceChange}>
                        {
                          Object.entries(SOURCES)
                            .map(([value, children]) =>
                              <option key={value} value={value}>{children}</option>,
                            )
                        }
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
