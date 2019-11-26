import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Autocomplete extends Component {
  static propTypes = {
    getSuggestions: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    name: PropTypes.string,
    searchOptions: PropTypes.object,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    autoCapitalize: PropTypes.string,
    autoComplete: PropTypes.string,
    autoCorrect: PropTypes.string,
    spellCheck: PropTypes.bool,
    required: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    pattern: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      suggestionTimeout: 0,
    };
  }

  onChange = e => {
    const { getSuggestions, searchOptions } = this.props;
    const userInput = e.target.value;
    clearTimeout(this.state.suggestionTimeout);

    if (userInput.length > 3) {
      const suggestionTimeout = setTimeout(() => {
        const data = getSuggestions(userInput, searchOptions);

        data.then(suggestions => {
          this.setState({
            activeSuggestion: 0,
            filteredSuggestions: suggestions,
            showSuggestions: true
          });
        });
      }, 400);
      this.setState({ suggestionTimeout });
    } else {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
      })
    }
    this.props.onChange(e);
  };

  onClick = () => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      if (activeSuggestion) {
        e.preventDefault();
        window.location = filteredSuggestions[activeSuggestion].url;
      }
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false
      });
    } else if (e.keyCode === 38) {
      e.preventDefault();
      if (activeSuggestion !== 0) {
        this.setState({ activeSuggestion: activeSuggestion - 1 });
        const newScroll = document.querySelector('.suggestion-active').offsetHeight;
        document.getElementById('suggestions').scrollBy(0, -newScroll);
      }
    } else if (e.keyCode === 40) {
      e.preventDefault();
      if (activeSuggestion + 1 < filteredSuggestions.length) {
        this.setState({ activeSuggestion: activeSuggestion + 1 });
        const newScroll = document.querySelector('.suggestion-active').offsetHeight;
        document.getElementById('suggestions').scrollBy(0, newScroll);
      }
    }
  };

  componentDidUpdate(prevProps) {
    const prevInput = prevProps.value;
    if (this.props.value !== prevInput) {
      this.onChange({
        target: document.querySelector(`#${this.props.id}`),
      });
    }
  }

  render() {
    const {
      onChange,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
      },
      props: {
        autoFocus,
        name,
        id,
        type,
        autoCapitalize,
        autoComplete,
        autoCorrect,
        spellCheck,
        required,
        className,
        placeholder,
        value,
        title,
        pattern,
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && value) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul id="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className = "gurbani-font ";

              if (index === activeSuggestion) {
                className += "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion.url}
                >
                  <a href={suggestion.url}>{suggestion.pankti}</a>
                </li>
              );
            })}
          </ul>
        );
      }
    }

    return (
      <Fragment>
        <input
          type={type}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          autoFocus={autoFocus}
          name={name}
          id={id}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          spellCheck={spellCheck}
          required={required}
          className={className}
          placeholder={placeholder}
          title={title}
          pattern={pattern}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;
