import React from 'react';
import PropTypes from 'prop-types';
import {
  TYPES,
  SOURCES,
  LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE,
  LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE,
  PLACEHOLDERS,
  DEFAULT_SEARCH_TYPE,
  DEFAULT_SEARCH_SOURCE,
  SEARCH_TYPES,
} from '../constants';
import { clickEvent, ACTIONS } from '../util/analytics';
import { getNumberFromLocalStorage } from '../util';

const onlyNumbers = str => str.replace(/\D/g, '');
export default class SearchForm extends React.PureComponent {
  static defaultProps = {
    defaultQuery: '',
    submitOnChangeOf: [],
  };

  static propTypes = {
    children: PropTypes.func.isRequired,
    defaultQuery: PropTypes.string,
    defaultType: PropTypes.oneOf(Object.keys(TYPES)),
    defaultSource: PropTypes.oneOf(Object.keys(SOURCES)),
    submitOnChangeOf: PropTypes.arrayOf(
      PropTypes.oneOf(['type', 'source', 'query'])
    ),
    onSubmit: props => {
      if (
        props.submitOnChangeOf.length !== 0 &&
        typeof props.onSubmit !== 'function'
      ) {
        return new Error(
          `"onSubmit" is required when "submitOnChange" isn't empty`
        );
      }
    },
  };

  state = {
    displayGurmukhiKeyboard: false,
    query: this.props.defaultQuery,
    shouldSubmit: false,
    type:
      this.props.defaultType ||
      getNumberFromLocalStorage(
        LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE,
        DEFAULT_SEARCH_TYPE
      ),
    source:
      this.props.defaultSource ||
      localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE) ||
      DEFAULT_SEARCH_SOURCE,
    placeholder: '',
    isAnimatingPlaceholder: false,
  };

  static getDerivedStateFromProps(
    { defaultType, defaultSource, defaultQuery },
    { type, source, query }
  ) {
    if (
      defaultQuery !== query ||
      defaultType !== type ||
      defaultSource !== source
    ) {
      return {
        query: defaultQuery || query,
        type: defaultType || type,
        source: defaultSource || source,
      };
    }
    return null;
  }

  animatePlaceholder = () => {
    const [finalPlaceholder] = PLACEHOLDERS[this.state.type];

    const tick = () =>
      (this.timer = setTimeout(
        () =>
          this._setState(({ isAnimatingPlaceholder, placeholder }) => {
            if (!isAnimatingPlaceholder) return null;

            if (placeholder === finalPlaceholder) {
              return { isAnimatingPlaceholder: false };
            } else if (finalPlaceholder[placeholder.length]) {
              return {
                placeholder: placeholder + finalPlaceholder[placeholder.length],
              };
            }
          }, () => this.state.isAnimatingPlaceholder && tick()),
        2000 / finalPlaceholder.length
      ));

    tick();
  };

  beginPlaceholderAnimation = () => {
    if (this.state.query === '') {
      clearTimeout(this.timer);
      this._setState({ isAnimatingPlaceholder: true, placeholder: '' }, () => {
        requestAnimationFrame(this.animatePlaceholder);
      });
    }
  };

  stopPlaceholderAnimation = () =>
    new Promise(resolve =>
      this.setState({ isAnimatingPlaceholder: false }, () => {
        clearTimeout(this.timer);
        resolve();
      })
    );

  _setState = (...args) => (this._mounted ? this.setState(...args) : null);

  componentDidMount() {
    this._mounted = true;
    this.beginPlaceholderAnimation();
  }

  componentWillUnmount() {
    this._mounted = false;
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

    const [, useEnglish = false] = PLACEHOLDERS[this.state.type];

    const className = useEnglish ? '' : 'gurbani-font';

    const [title, pattern] =
      this.state.type === SEARCH_TYPES.ROMANIZED
        ? ['Enter 4 words minimum.', '(\\w+\\W+){3,}\\w+\\W*']
        : this.state.type === SEARCH_TYPES.ANG
          ? []
          : ['Enter 2 characters minimum.', '.{2,}'];

    const [action, name] =
      this.state.type === SEARCH_TYPES.ANG ? ['/ang', 'ang'] : ['/search', 'q'];

    return this.props.children({
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
    });
  }
  componentDidUpdate() {
    const {
      state: { shouldSubmit, source, type, query },
      props: { onSubmit },
    } = this;

    if (shouldSubmit) {
      this.setState(
        {
          shouldSubmit: false,
        },
        () => {
          this.handleSubmit();
          onSubmit({
            source,
            type,
            query,
          });
        }
      );
    }
  }

  // Retuns a function
  setGurmukhiKeyboardVisibilityAs = value => () =>
    value !== this.state.displayGurmukhiKeyboard &&
    this.setState({ displayGurmukhiKeyboard: value }, () => {
      clickEvent({
        action: ACTIONS.GURMUKHI_KEYBOARD,
        label: value ? 1 : 0,
      });
    });

  setQueryAs = value => () =>
    this.stopPlaceholderAnimation().then(() =>
      this.setState(({ type }) => ({
        query: type === SEARCH_TYPES.ANG ? onlyNumbers(value) : value,
        shouldSubmit:
          this.props.submitOnChangeOf.includes('query') &&
          (type === SEARCH_TYPES.ANG ? onlyNumbers(value) : value) !== '',
      }))
    );

  handleSearchChange = ({ target: { value } }) => {
    this.setQueryAs(value)();
  };

  handleSearchSourceChange = e =>
    this.setState(
      {
        source: e.target.value,
        shouldSubmit:
          this.props.submitOnChangeOf.includes('source') &&
          this.state.query !== '',
      },
      () => {
        clickEvent({
          action: ACTIONS.SEARCH_SOURCE,
          label: this.state.source,
        });
        localStorage.setItem(
          LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE,
          this.state.source
        );
      }
    );

  handleSearchTypeChange = ({ currentTarget: { value } }) =>
    this.stopPlaceholderAnimation().then(() =>
      this.setState(
        {
          type: parseInt(value, 10),
          query:
            parseInt(value, 10) === SEARCH_TYPES.ANG
              ? onlyNumbers(this.state.query)
              : this.state.query,
          shouldSubmit:
            this.props.submitOnChangeOf.includes('type') &&
            this.state.query !== '',
        },
        () => {
          clickEvent({ action: ACTIONS.SEARCH_TYPE, label: this.state.type });
          localStorage.setItem(
            LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE,
            this.state.type
          );
          requestAnimationFrame(this.beginPlaceholderAnimation);
        }
      )
    );

  handleSubmit = () => {
    /* Possible Validations, Analytics */
    clickEvent({
      action: ACTIONS.SEARCH_QUERY,
      label: this.state.query,
    });
  };
}
