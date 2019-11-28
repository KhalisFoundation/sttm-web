import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Larivaar from '../components/Larivaar';

class Autocomplete extends Component {
  static propTypes = {
    getSuggestions: PropTypes.func.isRequired,
    searchOptions: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
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

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      e.preventDefault();
      window.location = filteredSuggestions[activeSuggestion].url;
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

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  componentDidUpdate(prevProps) {
    const prevInput = prevProps.value;
    if (this.props.value !== prevInput) {
      const { getSuggestions, searchOptions } = this.props;
      const userInput = this.props.value;
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
        });
      }
    }
    if (this.state.showSuggestions) {
      document.addEventListener('keydown', this.onKeyDown);
    } else {
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }

  render() {
    const {
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
      },
      props: {
        value,
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && value) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="search-result" id="suggestions" onKeyDown={this.onKeyDown}>
            {filteredSuggestions.map((suggestion, index) => {
              let className = "gurbani-font ";

              if (index === activeSuggestion) {
                className += "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion.url}
                  onMouseOver={() => {
                    this.setState({ activeSuggestion: index });
                  }}
                >
                  <a href={suggestion.url}>
                    <Larivaar
                      larivaarAssist={false}
                      enable={false}
                      unicode={false}
                      startIndex={suggestion.startIndex}
                      endIndex={suggestion.endIndex}
                      query={suggestion.query}
                    >
                      {suggestion.pankti}
                    </Larivaar>
                  </a>
                </li>
              );
            })}
          </ul>
        );
      }
    }

    return (
      <Fragment>
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;
