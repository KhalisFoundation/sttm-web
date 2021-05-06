/* globals DOODLE_URL */

import React from 'react';
import PropTypes from 'prop-types';

import { SOURCES, SEARCH_TYPES, TYPES, SOURCES_WITH_ANG, MAX_ANGS, SOURCE_WRITER_FILTER } from '../../constants';
import { toSearchURL, getShabadList, reformatSearchTypes } from '../../util';
import { pageView } from '../../util/analytics';


import { EnhancedGurmukhiKeyboard } from '@/components/EnhancedGurmukhiKeyboard';
import SehajPaathLink from '@/components/SehajPaathLink';
import { BaaniLinks } from '@/components/BaaniLinks/';
import SearchForm from '@/components/SearchForm';
import Logo from '@/components/Icons/Logo';
import SearchIcon from '@/components/Icons/Search';
import { Temple } from '@/components/Icons/Temple';
import Autocomplete from '@/components/Autocomplete';
import ClearSearchButton from '@/components/ClearSearchButton';
import Reset from '@/components/Icons/Reset';
import GurmukhiKeyboardToggleButton from '@/components/GurmukhiKeyboardToggleButton';
import { SyncIcon } from '@/components/Icons/SyncIcon';
import { Rehat } from '@/components/Icons/Rehat';
import { Sundar } from '@/components/Icons/Sundar';
import { RandomIcon } from '@/components/Icons/RandomIcon';
import { IndexIcon } from '@/components/Icons/IndexIcon';
import MultiViewHomeButton from '@/components/MultiViewHomeButton';
import { DesktopSync } from '@/components/Icons/DesktopSync';

/**
 *
 *
 * @export
 * @class Home
 * @extends {React.PureComponent}
 */
class Home extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }),
  };

  state = {
    showDoodle: false,
    doodleData: null,
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
          disabled,
          title,
          className,
          displayGurmukhiKeyboard,
          query,
          type,
          inputType,
          source,
          writer,
          writers,
          action,
          name,
          placeholder,
          isShowKeyboard,
          setGurmukhiKeyboardVisibilityAs,
          setQueryAs,
          isSourceChanged,
          isWriterChanged,
          handleKeyDown,
          handleSearchChange,
          handleSearchSourceChange,
          handleSubmit,
          handleSearchTypeChange,
          handleSearchWriterChange,
          handleReset,
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
                    writer,
                  })}
                >
                  <div className="flex justify-center align-center">
                    <div>
                      {showDoodle ? (
                        <Logo className="logo-long" doodle={doodleData} />)
                        : (
                          <Logo className="logo-long" />
                        )}
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
                    <button type="submit" disabled={disabled}>
                      <SearchIcon />
                    </button>

                    {isShowKeyboard && <EnhancedGurmukhiKeyboard
                      value={query}
                      searchType={type}
                      active={displayGurmukhiKeyboard}
                      onKeyClick={newValue => {
                        setQueryAs(newValue)()
                      }}
                      onClose={setGurmukhiKeyboardVisibilityAs(false)}
                    />}
                  </div>
                  <Autocomplete
                    isShowFullResults
                    getSuggestions={getShabadList}
                    searchOptions={{ type, source, writer }}
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
                        {reformatSearchTypes(TYPES).map(({ type, value }) => (
                          <option key={value} value={value}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="search-option">
                      {type === SEARCH_TYPES['ANG'] ? (
                        <select
                          name="source"
                          value={Object.keys(SOURCES_WITH_ANG).includes(source) ? source : 'G'}
                          className={[isSourceChanged ? 'selected' : null]}
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
                          className={[isSourceChanged ? 'selected' : null]}
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
                    <div className="search-option">
                      <select
                        name="writer"
                        value={writer}
                        className={[isWriterChanged ? 'selected' : null]}
                        onChange={handleSearchWriterChange}>
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
                    </div>
                    <button
                      className="reset"
                      onClick={handleReset}
                      title="Reset"
                      aria-label="Reset">
                      <Reset />
                    </button>
                  </div>

                </form>
              </div>
              <div className="apps-container">
                <SehajPaathLink />
                <BaaniLinks />
                <div className="apps-item">
                  <div className="apps-title">Show Multiple</div>
                  <MultiViewHomeButton />
                </div>
                <div className="apps-item">
                  <div className="apps-title">Sri Harimandir Sahib</div>
                  <button onClick={() => window.location.href = '/hukamnama'}
                    title="Today's Hukamnama"
                    aria-label="Today's Hukamnama">
                    <div className="apps-icon-container">
                      <Temple />
                    </div>
                    Today&apos;s Hukamnama
                  </button>
                </div>
                <div className="apps-item">
                  <div className="apps-title">Random Shabad</div>
                  <button onClick={() => window.location.href = '/random'}
                    title="Random Shabad"
                    aria-label="Random Shabad">
                    <div className="apps-icon-container">
                      <RandomIcon />
                    </div>
                    Generate
                  </button>
                </div>
                <div className="apps-item">
                  <div className="apps-title">Code of Conduct</div>
                  <button onClick={() => window.location.href = '/rehat-maryadha'}>
                    <div className="apps-icon-container">
                      <Rehat />
                    </div>
                    Rehat Maryadha
                  </button>
                </div>
                <div className="apps-item">
                  <div className="apps-title">Compiled Baanis</div>
                  <button onClick={() => window.location.href = '/sundar-gutka'}>
                    <div className="apps-icon-container">
                      <Sundar />
                    </div>
                    Sundar Gutka
                  </button>
                </div>
                <div className="apps-item">
                  <div className="apps-title">Index</div>
                  <button onClick={() => window.location.href = '/index'}>
                    <div className="apps-icon-container">
                      <IndexIcon />
                    </div>
                    View Index
                  </button>
                </div>
                <div className="apps-item">
                  <div className="apps-title">Follow Along</div>
                  <button onClick={() => window.location.href = '/sync'}>
                    <div className="apps-icon-container">
                      <SyncIcon />
                    </div>
                    Sangat Sync
                  </button>
                </div>
                <div className="apps-item">
                  <div className="apps-title">Control Desktop</div>
                  <button onClick={() => window.location.href = '/control'}>
                    <div className="apps-icon-container">
                      <DesktopSync />
                    </div>
                    Bani Controller
                  </button>
                </div>
              </div>

              {showDoodle && (
                <a href={doodleData['SourceLink']} target="_blank" rel="noreferrer">
                  <p className="doodle-credit">Special thanks to {doodleData['SourceText']}</p>
                </a>
              )}
            </div>
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

export default Home;
