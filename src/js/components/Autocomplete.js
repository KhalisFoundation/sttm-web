import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// import Fetch from '@/components/Fetch';

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
      userInput: ""
    };
  }

  onChange = e => {
    const { getSuggestions, searchOptions } = this.props;
    const userInput = e.currentTarget.value;

    if (userInput.length > 3) {
      const data = getSuggestions(userInput, searchOptions);

      data.then(suggestions => {

        const filteredSuggestions = suggestions.filter(
          suggestion =>
            suggestion.query.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
          activeSuggestion: 0,
          filteredSuggestions,
          showSuggestions: true
        });
      });
    }
    this.setState({ userInput: e.currentTarget.value });
    this.props.onChange(e);
  };

  onClick = e => {

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }

    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }

    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
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
        title,
        pattern,
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
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
          value={userInput}
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
