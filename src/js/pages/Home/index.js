/* globals DOODLE_URL */
import React from 'react';
import PropTypes from 'prop-types';

import { EnhancedGurmukhiKeyboard } from '@/components/EnhancedGurmukhiKeyboard';
import SehajPaathLink from '@/components/SehajPaathLink';
import { BaaniLinks } from '@/components/BaaniLinks/';
import SearchForm from '@/components/SearchForm';
import Logo from '@/components/Icons/Logo';
import SearchIcon from '@/components/Icons/Search';
import Autocomplete from '@/components/Autocomplete';
import ClearSearchButton from '@/components/ClearSearchButton';
import Reset from '@/components/Icons/Reset';
import GurmukhiKeyboardToggleButton from '@/components/GurmukhiKeyboardToggleButton';

import HomePageIcons from './HomePageIcons';
import {
  SOURCES,
  SEARCH_TYPES,
  TYPES,
  SOURCES_WITH_ANG,
  MAX_ANGS,
  SOURCE_WRITER_FILTER,
} from '../../constants';
import { toSearchURL, getShabadList, reformatSearchTypes } from '../../util';
import { pageView } from '../../util/analytics';
import { setModalOpen } from '@/features/actions';
import { connect } from 'react-redux';
import MicIcon from '@/components/Icons/MicIcon';
import Waveform from '@/components/Waveform';

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
    isHome: PropTypes.bool,
    setModalOpen: PropTypes.func.isRequired,
  };
  static defaultProps = {
    isHome: false,
  };

  state = {
    showDoodle: false,
    doodleData: null,
    isRecording: false,
    audioStream: null,
  };

  fetchDoodle = () => {
    fetch(`${DOODLE_URL}`)
      .then((r) => r.json())
      .then(
        (data) => {
          if (data.rows.length) {
            this.setState({ showDoodle: true, doodleData: data.rows[0] });
          }
        },
        (error) => {
          console.log(error);
          this.setState({ showDoodle: false, doodleData: null });
        }
      );
  };

  onSubmit =
    ({ handleSubmit, ...data }) =>
    (e) => {
      e.preventDefault();
      handleSubmit();

      // Remove the last space in from the searched query.
      const isNotAngSearch = SEARCH_TYPES[data.type] !== SEARCH_TYPES.ANG;
      if (isNotAngSearch) {
        data.query = data.query.trim();
      }

      this.props.history.push(toSearchURL(data));
    };

  handleRecordingStateChange = (isRecording, stream) => {
    this.setState({
      isRecording,
      audioStream: stream,
    });
  };

  render() {
    const { showDoodle, doodleData, isRecording, audioStream } = this.state;
    const { isHome } = this.props;
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
          <>
            <div className="row" id="content-root">
              <div
                className={
                  showDoodle ? 'search-page doodle-logo-page' : 'search-page'
                }
              >
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
                    <div className="flex flex-direction-column">
                      <Logo
                        className="logo-long"
                        doodle={showDoodle ? doodleData : null}
                      />

                      <span className="new-text">
                        <b className="new-text-blue">NEW </b>
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            this.props.setModalOpen('AskGurbaniBotQuestion');
                          }}
                        >
                          Get your questions answered by our AI Gurbani bot!{' '}
                          <u>Try it now.</u>
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="search-container-wrapper">
                    <div
                      id="search-container"
                      className={displayGurmukhiKeyboard ? 'kb-active' : ''}
                    >
                      {isRecording ? (
                        <div className="waveform-container">
                          <Waveform
                            stream={audioStream}
                            isRecording={isRecording}
                            width={200}
                            height={30}
                            barColor="#007bff"
                          />
                        </div>
                      ) : (
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
                      )}
                      <ClearSearchButton clickHandler={setQueryAs} />
                      <MicIcon
                        onTranscriptionResult={(result) => {
                          if (type !== SEARCH_TYPES.FIRST_LETTERS_ANYWHERE) {
                            handleSearchTypeChange({
                              currentTarget: {
                                value: SEARCH_TYPES.FIRST_LETTERS_ANYWHERE,
                              },
                            });
                          }
                          setQueryAs(result.unicode)();

                          setTimeout(() => {
                            this.onSubmit({
                              handleSubmit,
                              query: result.unicode,
                              type: SEARCH_TYPES.FIRST_LETTERS_ANYWHERE,
                              source,
                              writer,
                            })(new Event('submit'));
                          }, 100);
                        }}
                        onError={(error) => {
                          console.error('Transcription error:', error);
                        }}
                        onRecordingStateChange={this.handleRecordingStateChange}
                      />
                      {isShowKeyboard && (
                        <GurmukhiKeyboardToggleButton
                          clickHandler={setGurmukhiKeyboardVisibilityAs}
                          isVisible={displayGurmukhiKeyboard}
                        />
                      )}
                      <button type="submit" disabled={disabled}>
                        <SearchIcon />
                      </button>

                      {isShowKeyboard && (
                        <EnhancedGurmukhiKeyboard
                          value={query}
                          searchType={type}
                          active={displayGurmukhiKeyboard}
                          onKeyClick={(newValue) => {
                            setQueryAs(newValue)();
                          }}
                          onClose={setGurmukhiKeyboardVisibilityAs(false)}
                        />
                      )}
                    </div>
                    {!displayGurmukhiKeyboard && (
                      <a
                        target="blank"
                        rel="noopener noreferrer"
                        href="https://support.khalisfoundation.org/support/solutions"
                        className="question-icon-wrapper"
                      >
                        <span className="question-icon">?</span>
                      </a>
                    )}
                  </div>
                  <Autocomplete
                    isShowFullResults
                    getSuggestions={getShabadList}
                    searchOptions={{ type, source, writer }}
                    value={query}
                    isHome={isHome}
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
                          value={
                            Object.keys(SOURCES_WITH_ANG).includes(source)
                              ? source
                              : 'G'
                          }
                          className={[isSourceChanged ? 'selected' : null]}
                          onChange={handleSearchSourceChange}
                          disabled={type === SEARCH_TYPES.ASK_A_QUESTION}
                        >
                          {Object.entries(SOURCES_WITH_ANG).map(
                            ([value, children]) => (
                              <option key={value} value={value}>
                                {children}
                              </option>
                            )
                          )}
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
                      )}
                    </div>
                    <div className="search-option">
                      <select
                        name="writer"
                        value={writer}
                        className={[isWriterChanged ? 'selected' : null]}
                        disabled={type === SEARCH_TYPES.ASK_A_QUESTION}
                        onChange={handleSearchWriterChange}
                      >
                        {writers
                          ?.filter((e) =>
                            source === 'G' || source === 'A'
                              ? !SOURCE_WRITER_FILTER[source].includes(
                                  e.writerID
                                )
                              : source !== 'all'
                              ? SOURCE_WRITER_FILTER[source].includes(
                                  e.writerID
                                )
                              : true
                          )
                          .map((writer) => (
                            <option
                              key={writer.writerID}
                              value={writer.writerID}
                            >
                              {writer.writerEnglish}
                            </option>
                          ))}
                      </select>
                    </div>
                    <button
                      className="reset"
                      onClick={handleReset}
                      title="Reset"
                      aria-label="Reset"
                    >
                      <Reset />
                    </button>
                  </div>
                </form>
              </div>
              <div className="apps-container">
                <SehajPaathLink />
                <BaaniLinks />
                <HomePageIcons />
              </div>

              {showDoodle && (
                <a
                  href={doodleData['SourceLink']}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="doodle-credit">
                    Special thanks to {doodleData['SourceText']}
                  </p>
                </a>
              )}
            </div>
          </>
        )}
      </SearchForm>
    );
  }

  componentDidMount() {
    pageView('/');
    this.fetchDoodle();
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setModalOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
