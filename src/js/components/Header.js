import React from 'react';
import { SOURCES, TYPES } from 'shabados';

const types = [...TYPES, 'Ang'];
import { GurmukhiKeyboard, SearchForm } from './';

export default function Header({ isHome = false }) {
  return (
    <div className="top-bar no-select">
      <div className="row">
        <div className="top-bar-title">
          <a href="/"></a>
        </div>
        <SearchForm>{({
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
              <div id="responsive-menu">
                <div className="top-bar-left">
                  {!isHome && (
                    <form action={action} id="top-bar-search-form" className="search-form" onSubmit={handleSubmit}>
                      <ul className="menu">
                        <li><input name="type" className="hidden" id="search-type-value" hidden /></li>
                        <li><input name="source" className="hidden" id="search-source-value" hidden /></li>
                        <li>
                          <div id="search-container">

                            <input
                              type="search"
                              name={name}
                              id="search"
                              autoComplete="off"
                              autoCapitalize="none"
                              autoCorrect="off"
                              spellCheck="false"
                              required
                              value={query}
                              onChange={handleSearchChange}
                              className={className}
                              placeholder={placeholder}
                              title={title}
                              pattern={pattern}
                            />

                            <button type="button" className="clear-search-toggle">
                              <i className="fa fa-times"></i>
                            </button>

                            <button
                              className="gurmukhi-keyboard-toggle"
                              type="button"
                              onClick={setGurmukhiKeyboardVisibilityAs(!displayGurmukhiKeyboard)}
                            >
                              <i className="fa fa-keyboard-o"></i>
                            </button>

                            <button type="submit"><i className="fa fa-search"></i></button>

                            <GurmukhiKeyboard
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
                <div className="top-bar-right">
                  <a
                    href="#"
                    className="button"
                    id="open-mobile-menu"
                    onClick={() => document.body.classList.toggle('menu-open')}
                  >
                    <i className="fa fa-bars" />
                  </a>
                  <ul className="menu header-menu">
                    <li><a href="/hukamnama">Hukamnama</a></li>
                    <li><a href="/shabad?random">Random Shabad</a></li>
                    <li className="close">
                      <a
                        href="#"
                        onClick={() => document.body.classList.remove('menu-open')}
                      >
                        Close
              </a>
                    </li>
                  </ul>
                </div>
              </div>
              {!isHome && (
                <div id="search-options">
                  <select name="type" id="search-type" value={type} onChange={handleSearchTypeChange}>
                    {
                      types
                        .map((children, value) =>
                          <option
                            key={value}
                            value={value}
                            children={children}
                          />,
                        )
                    }
                  </select>
                  <select name="source" value={source} onChange={handleSearchSourceChange}>
                    {
                      Object.entries(SOURCES)
                        .map(([value, children]) =>
                          <option
                            key={value}
                            value={value}
                            children={children}
                          />,
                        )
                    }
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
