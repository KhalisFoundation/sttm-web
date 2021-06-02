import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { setMultipleShabads, setMultiViewPanel } from '@/features/actions';

import Larivaar from '../components/Larivaar';
import { toSearchURL } from '@/util';
import { ShabadButtonWrapper } from "./ShabadButtonWrapper";

class Autocomplete extends Component {
  static propTypes = {
    isShowFullResults: PropTypes.bool,
    getSuggestions: PropTypes.func.isRequired,
    searchOptions: PropTypes.object.isRequired,
    multipleShabads: PropTypes.array.isRequired,
    showMultiViewPanel: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    setMultipleShabads: PropTypes.func.isRequired,
    setMultiViewPanel: PropTypes.func.isRequired,
    isHome: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef()

    this.state = {
      activeSuggestion: -1,
      filteredSuggestions: [],
      showSuggestions: false,
      suggestionTimeout: 0,
    };
  }

  onKeyDown = e => {
    e.stopPropagation();
    const { activeSuggestion, filteredSuggestions } = this.state;
    const isEnterKey = e.keyCode == 13;
    const isArrowDownKey = e.keyCode == 38;
    const isArrowUpKey = e.keyCode == 40;
    const isActiveSuggestion = activeSuggestion !== -1;

    if (isEnterKey) {

      if (isActiveSuggestion)
        window.location = filteredSuggestions[activeSuggestion].url;

      this.setState({
        activeSuggestion: -1,
        filteredSuggestions: [],
        showSuggestions: false,
      });

    }
    else if (isArrowDownKey) {
      e.preventDefault();
      if (isActiveSuggestion) {
        this.setState({ activeSuggestion: activeSuggestion - 1 });
        const newScroll = document.querySelector('.suggestion-active').offsetHeight;
        document.getElementById('suggestions').scrollBy(0, -newScroll);
      }
    }
    else if (isArrowUpKey) {
      e.preventDefault();
      const totalSuggestions = filteredSuggestions.length;

      if (activeSuggestion + 1 < totalSuggestions) {
        this.setState({ activeSuggestion: activeSuggestion + 1 }, () => {
          const newScroll = document.querySelector('.suggestion-active').offsetHeight;
          activeSuggestion + 1 !== 0 && document.getElementById('suggestions').scrollBy(0, newScroll);
        });
      }
    }
  };

  // Closing suggestions on mouse down
  onMouseDown = e => {
    e.stopPropagation();
    (this.state.showSuggestions && !this.wrapperRef.current.contains(e.target)) &&       
    this.setState({
      showSuggestions: false,
    });    
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    clearTimeout(this.state.suggestionTimeout);
    document.removeEventListener('mousedown', this.onMouseDown);
  }

  componentDidUpdate(prevProps) {
    const prevInput = prevProps.value;

    if (this.props.value !== prevInput) {
      const { isShowFullResults, getSuggestions, searchOptions, value: userInput } = this.props;
      const isSearchTypeAng = searchOptions.type === 5;
      const isSearchTypeRomanized = searchOptions.type === 4;
      let isQueryValid = false;
      if (userInput.trim().split(' ').length >= 4 && isSearchTypeRomanized) {
        isQueryValid = true;
      } else if (
        userInput.length >= 2 &&
        !isSearchTypeAng &&
        !isSearchTypeRomanized
      ) {
        isQueryValid = true;
      }
      clearTimeout(this.state.suggestionTimeout);

      if (isQueryValid) {
        const suggestionTimeout = setTimeout(() => {

          getSuggestions(userInput, searchOptions)
            .then(suggestions => {

              // if any suggestion exists, only then add this as final result item
              if (isShowFullResults && suggestions.length) {
                suggestions.push({
                  name: 'Show full results',
                  url: toSearchURL({
                    ...searchOptions,
                    query: userInput,
                  })
                });
              }

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
        searchOptions
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && value) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul
            className="search-result"
            id="suggestions"
            ref={this.wrapperRef}
            onKeyDown={this.onKeyDown} >
            {filteredSuggestions.map((suggestion, index) => {
              let className = searchOptions.type !== 3 ? "gurbani-font " : " ";
              const isLastIdx = index === (filteredSuggestions.length - 1);
              const isShowFullResultsListItem = isShowFullResults && isLastIdx;

              if (isShowFullResultsListItem) {
                className = "show-all-results "
              }

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
                  {isShowFullResultsListItem ?
                    <Link
                      to={suggestion.url}
                    >
                      {suggestion.name}
                    </Link>
                    :
                    <>
                      <a href={suggestion.url}>
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
                      </a>  
                      {
                        <div className="add-shabad-wrapper">
                          <ShabadButtonWrapper shabad={suggestion} />
                        </div>
                      }                    
                    </>
                    }
                </li>
              );
            })}
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

const mapStateToProps = ({ multipleShabads, showMultiViewPanel }) => ({ multipleShabads, showMultiViewPanel })

const mapDispatchToProps = {
  setMultipleShabads,
  setMultiViewPanel,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Autocomplete);
