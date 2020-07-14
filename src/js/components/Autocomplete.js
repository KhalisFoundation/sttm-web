import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';

import Larivaar from '../components/Larivaar';
import { toSearchURL } from '../util';
class Autocomplete extends Component {
  static propTypes = {
    isShowFullResults: PropTypes.bool,
    onItemClick: PropTypes.func,
    getSuggestions: PropTypes.func.isRequired,
    searchOptions: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: -1,
      filteredSuggestions: [],
      showSuggestions: false,
      suggestionTimeout: 0,
    };
  }

  resetSearchResults = () => {
    this.setState((prevState) =>
      ({
        ...prevState,
        activeSuggestion: -1,
        filteredSuggestions: [],
        showSuggestions: false,
      })
    );
  }

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      if (activeSuggestion !== -1) e.preventDefault();

      this.resetSearchResults();
      this.props.history.push(filteredSuggestions[activeSuggestion].url);
      this.props.onItemClick && this.props.onItemClick();

    } else if (e.keyCode === 38) {
      e.preventDefault();
      if (activeSuggestion !== -1) {
        this.setState({ activeSuggestion: activeSuggestion - 1 });
        const newScroll = document.querySelector('.suggestion-active').offsetHeight;
        document.getElementById('suggestions').scrollBy(0, -newScroll);
      }
    } else if (e.keyCode === 40) {
      e.preventDefault();
      if (activeSuggestion + 1 < filteredSuggestions.length) {
        this.setState({ activeSuggestion: activeSuggestion + 1 });
        const newScroll = document.querySelector('.suggestion-active').offsetHeight;
        activeSuggestion + 1 !== 0 && document.getElementById('suggestions').scrollBy(0, newScroll);
      }
    }
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    clearTimeout(this.state.suggestionTimeout);
  }

  componentDidUpdate(prevProps) {
    const prevInput = prevProps.value;
    if (this.props.value !== prevInput) {
      const { getSuggestions, searchOptions } = this.props;
      const userInput = this.props.value;
      clearTimeout(this.state.suggestionTimeout);

      if (userInput.length >= 2 && this.props.searchOptions.type !== 5) {
        const suggestionTimeout = setTimeout(() => {

          getSuggestions(userInput, searchOptions)
            .then(suggestions => {
              this.setState({
                activeSuggestion: -1,
                filteredSuggestions: suggestions,
                showSuggestions: true,
              });
            });

        }, 400);
        this.setState({ suggestionTimeout });
      } else {
        this.setState({
          activeSuggestion: -1,
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
        isShowFullResults = false,
        value,
        searchOptions,
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && value) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul
            id="suggestions"
            className="search-result"
            onKeyDown={this.onKeyDown}>
            {filteredSuggestions.map((suggestion, index) => {
              let className = searchOptions.type !== 3 ? "gurbani-font " : " ";

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
                  <Link
                    to={suggestion.url}
                    onClick={() => {
                      setTimeout(this.resetSearchResults, 2000);
                      if (this.props.onItemClick)
                        this.props.onItemClick();
                    }}
                  >
                    <Larivaar
                      larivaarAssist={false}
                      enable={false}
                      unicode={false}
                      highlightIndex={suggestion.highlightIndex}
                      query={suggestion.query}
                      type={searchOptions.type}
                    >
                      {searchOptions.type === 3 ? suggestion.translation : suggestion.pankti}
                    </Larivaar>
                    {searchOptions.type === 3 && (<p className="gurbani-font">{suggestion.pankti}</p>)}
                  </Link>
                </li>
              );
            })}
            {isShowFullResults &&
              <li
                className="show-all-results"
                ref={el => this.lastItem = el}
                onMouseOver={() => {
                  this.setState(prevState => ({
                    ...prevState,
                    activeSuggestion: -1,
                  }))
                  this.lastItem.classList.add('suggestion-active');
                }}
                onMouseLeave={() => {
                  this.lastItem.classList.remove('suggestion-active');
                }}
              >
                <Link
                  to={toSearchURL({
                    ...searchOptions,
                    query: value,
                  })}
                >
                  Show all results
                </Link>
              </li>}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <ul className="search-result" id="suggestions">
            <li><a>No matched results.</a></li>
          </ul>
        )
      }
    }

    return (
      <Fragment>
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default withRouter(Autocomplete);
