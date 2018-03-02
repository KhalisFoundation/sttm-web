import React from 'react';
import PropTypes from 'prop-types';
import {
  LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE,
  LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE,
  PLACEHOLDERS,
  DEFAULT_SEARCH_TYPE,
  DEFAULT_SEARCH_SOURCE,
} from '../constants';

const onlyNumbers = str => str.replace(/\D/g, '');
export default class SearchForm extends React.PureComponent {
  static defaultProps = {
    defaultQuery: '',
  };

  static propTypes = {
    children: PropTypes.func.isRequired,
    defaultQuery: PropTypes.string,
  };

  state = {
    displayGurmukhiKeyboard: false,
    query: this.props.defaultQuery,
    type: parseInt(localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE) || DEFAULT_SEARCH_TYPE, 10),
    source: localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE) || DEFAULT_SEARCH_SOURCE,
    placeholder: '',
    isAnimatingPlaceholder: false,
  };

  animatePlaceholder = () => {
    const [finalPlaceholder] = PLACEHOLDERS[this.state.type];

    const tick = () => setTimeout(() => this.setState(
      ({ isAnimatingPlaceholder, placeholder }) => {
        if (!isAnimatingPlaceholder) return null;

        if (placeholder === finalPlaceholder) {
          return { isAnimatingPlaceholder: false };
        } else if (finalPlaceholder[placeholder.length]) {
          return { placeholder: placeholder + finalPlaceholder[placeholder.length] };
        }
      },
      () => this.state.isAnimatingPlaceholder && tick()
    ), 2000/finalPlaceholder.length);

    tick();
  }

  beginPlaceholderAnimation = () => this.setState(
    { isAnimatingPlaceholder: true, placeholder: '' },
    () => requestAnimationFrame(this.animatePlaceholder)
  );

  componentDidMount() {
    this.beginPlaceholderAnimation();
  }

  render() {
    const {
      state,
      setGurmukhiKeyboardVisibilityAs,
      setQueryAs,
      handleSearchChange,
      handleSearchSourceChange,
      handleSearchTypeChange,
      handleSubmit,
    } = this;

    const [,useEnglish = false] = PLACEHOLDERS[this.state.type];

    const className = useEnglish ? '' : 'gurbani-font';

    const [title, pattern] = this.state.type === 4
      ? ['Enter 4 words minimum.', '(\\w+\\W+){3,}\\w+\\W*']
      : this.state.type === 5
        ? []
        : ['Enter 2 characters minimum.', '.{2,}'];

    const [action, name] = this.state.type === 5 ? ['/ang', 'ang'] : ['/search', 'q'];

    return (
      this.props.children({
        pattern,
        title,
        className,
        ...state,
        action,
        name,
        setGurmukhiKeyboardVisibilityAs,
        setQueryAs,
        handleSearchChange,
        handleSearchSourceChange,
        handleSearchTypeChange,
        handleSubmit,
      })
    );
  }

  // Retuns a function
  setGurmukhiKeyboardVisibilityAs = value => () => this.setState({ displayGurmukhiKeyboard: value });
  setQueryAs = value => () => this.setState({ query: value });

  handleSearchChange = ({ target: { value } }) => this.setState(({ type }) => ({
    query: type === 5 ? onlyNumbers(value) : value
  }));

  handleSearchSourceChange = e => this.setState(
    { source: e.target.value },
    () => localStorage.setItem(LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE, this.state.source)
  );

  handleSearchTypeChange = e => this.setState(
    { type: parseInt(e.target.value, 10) },
    () => {
      localStorage.setItem(LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE, this.state.type); 
      requestAnimationFrame(this.beginPlaceholderAnimation);
    }
  );

  handleSubmit = () => {/* Possible Validations, Analytics */};
}