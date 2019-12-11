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
  SOURCES_WITH_ANG,
} from '../constants';
import { clickEvent, ACTIONS } from '../util/analytics';
import { getNumberFromLocalStorage } from '../util';

/**
 *
 *
 * @export
 * @class SearchForm
 * @augments {React.PureComponent<SearchFormProps>}
 */
export default class SearchForm extends React.PureComponent {
  static defaultProps = {
    defaultQuery: '',
    submitOnChangeOf: [],
  };

  /**
   * @typedef {object} SearchFormRenderProps
   * @property {string} pattern attribute of input field
   * @property {string} title of input field
   * @property {string} className className of input field
   * @property {string} action of form
   * @property {string} name of input field
   * @property {string} inputType Search type chosen by used
   * @property {function} setGurmukhiKeyboardVisibilityAs
   * @property {function} setQueryAs
   * @property {function} handleSearchChange
   * @property {function} handleSearchSourceChange
   * @property {function} handleSearchTypeChange
   * @property {function} handleSubmit
   *
   * @typedef {object} SearchFormProps
   * @property {SearchFormRenderProps => React.Element} children as a function
   * @property {string} defaultQuery to initialize with
   * @property {string} defaultType to initialize with
   * @property {string} defaultSource to initiaize with
   * @property {Array<'type'|'source'|'query'>} submitOnChangeOf given fields
   * @property {function} onSubmit event handler
   *
   * @static
   * @memberof SearchForm
   */
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

  animatePlaceholder = () => {
    const [finalPlaceholder] = PLACEHOLDERS[this.state.type];

    const tick = () =>
      (this.timer = setTimeout(
        () =>
          this._setState(
            ({ isAnimatingPlaceholder, placeholder }) => {
              if (!isAnimatingPlaceholder) return null;

              if (placeholder === finalPlaceholder) {
                return { isAnimatingPlaceholder: false };
              } else if (finalPlaceholder[placeholder.length]) {
                return {
                  placeholder:
                    placeholder + finalPlaceholder[placeholder.length],
                };
              }
            },
            () => this.state.isAnimatingPlaceholder && tick()
          ),
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

    const typeInt = parseInt(this.state.type);

    const [title, pattern] =
      typeInt === SEARCH_TYPES.ROMANIZED
        ? ['Enter 4 words minimum.', '(\\w+\\W+){3,}\\w+\\W*']
        : typeInt === SEARCH_TYPES.ANG
          ? ['Enter numbers only.', '\\d+']
          : ['Enter 2 characters minimum.', '.{2,}'];

    const [action, name, inputType] = SearchForm.getFormDetails(
      this.state.type
    );

    return this.props.children({
      ...state,
      pattern,
      title,
      className,
      action,
      name,
      inputType,
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
      this.setState(() => ({
        query: value,
        shouldSubmit:
          this.props.submitOnChangeOf.includes('query') && value !== '',
      }))
    );

  handleSearchChange = ({ target }) => {
    const cursorStart = target.selectionStart;
    const cursorEnd = target.selectionEnd;

    this.setQueryAs(target.value)().then(() => {
      if (cursorStart !== null) {
        return target.setSelectionRange(cursorStart, cursorEnd)
      }
    });
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
          source: parseInt(value, 10) === SEARCH_TYPES['ANG'] &&
            !Object.keys(SOURCES_WITH_ANG).includes(this.state.source) ?
            'G' : this.state.source,
          query: this.state.query,
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
          localStorage.setItem(
            LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE,
            this.state.source
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

  /**
   * Returns an array of form action, input name and input type
   * @param {number} type
   * @memberof SearchForm
   */
  static getFormDetails = type =>
    type === SEARCH_TYPES.ANG
      ? ['/ang', 'ang', 'number']
      : ['/search', 'q', 'search'];
}
