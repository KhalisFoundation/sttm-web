import React from 'react';
import PropTypes from 'prop-types';

import {
  TYPES,
  SOURCES,
  LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE,
  LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE,
  LOCAL_STORAGE_KEY_FOR_SEARCH_RAAG,
  LOCAL_STORAGE_KEY_FOR_SEARCH_WRITER,
  PLACEHOLDERS,
  DEFAULT_SEARCH_TYPE,
  DEFAULT_SEARCH_SOURCE,
  DEFAULT_SEARCH_RAAG,
  DEFAULT_SEARCH_WRITER,
  SEARCH_TYPES,
  SEARCH_TYPES_NOT_ALLOWED_KEYS,
  SOURCES_WITH_ANG,
} from '@/constants';
import { getNumberFromLocalStorage, clickEvent, ACTIONS } from '@/util';

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
    isHomePage: false,
    submitOnChangeOf: [],
  };

  /**
   * @typedef {object} SearchFormRenderProps
   * @property {boolean} isHomePage
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
   * @property {function} handleSearchRaagChange
   * @property {function} handleSearchWriterChange
   * @property {function} handleSubmit
   *
   * @typedef {object} SearchFormProps
   * @property {SearchFormRenderProps => React.Element} children as a function
   * @property {string} defaultQuery to initialize with
   * @property {string} defaultType to initialize with
   * @property {string} defaultSource to initiaize with
   * @property {number} defaultRaag
   * @property {number} defaultWriter
   * @property {Array<'type'|'source'|'query'>} submitOnChangeOf given fields
   * @property {function} onSubmit event handler
   *
   * @static
   * @memberof SearchForm
   */
  static propTypes = {
    children: PropTypes.func.isRequired,
    isHomePage: PropTypes.bool,
    defaultQuery: PropTypes.string,
    defaultType: PropTypes.oneOf(Object.keys(TYPES).map(type => parseInt(type))),
    defaultSource: PropTypes.oneOf(Object.keys(SOURCES)),
    defaultRaag: PropTypes.number,
    defaultWriter: PropTypes.number,
    submitOnChangeOf: PropTypes.arrayOf(
      PropTypes.oneOf(['type', 'source', 'raag', 'writer', 'query'])
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
    raag:
      this.props.defaultRaag ||
      getNumberFromLocalStorage(
        LOCAL_STORAGE_KEY_FOR_SEARCH_RAAG,
        DEFAULT_SEARCH_RAAG
      ),
    writer:
      this.props.defaultWriter ||
      getNumberFromLocalStorage(
        LOCAL_STORAGE_KEY_FOR_SEARCH_WRITER,
        DEFAULT_SEARCH_WRITER
      ),
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
    console.log("UNMOUNTING THE SEARCH FORM....")
  }

  render() {
    const {
      state,
      setQueryAs,
      setGurmukhiKeyboardVisibilityAs,
      handleSearchChange,
      handleSearchSourceChange,
      handleSearchTypeChange,
      handleSearchRaagChange,
      handleSearchWriterChange,
      handleSubmit,
      handleKeyDown
    } = this;

    const { type } = this.state;
    const typeInt = parseInt(type);
    const [, useEnglish = false] = PLACEHOLDERS[type];
    const className = useEnglish ? '' : 'gurbani-font';
    const isShowKeyboardIcon = typeInt <= 2 || typeInt === 6;
    const [title, pattern] =
      typeInt === SEARCH_TYPES.ROMANIZED
        ? ['Enter 4 words minimum.', '(\\w+\\W+){3,}\\w+\\W*']
        : typeInt === SEARCH_TYPES.ANG
          ? ['Enter numbers only.', '\\d+']
          : ['Enter 2 characters minimum.', '.{2,}'];

    const [action, name, inputType] = SearchForm.getFormDetails(
      typeInt
    );

    return this.props.children({
      ...state,
      isShowKeyboardIcon,
      pattern,
      title,
      className,
      action,
      name,
      inputType,
      setQueryAs,
      setGurmukhiKeyboardVisibilityAs,
      handleSearchChange,
      handleSearchSourceChange,
      handleSearchTypeChange,
      handleSearchRaagChange,
      handleSearchWriterChange,
      handleSubmit,
      handleKeyDown,
    });

  }
  componentDidUpdate() {
    const {
      state: { shouldSubmit, raag, writer, source, type, query },
      props: { onSubmit, isHomePage },
    } = this;
    console.log(raag, writer, source, type, query, ">>>>>>>>.")
    if (shouldSubmit) {
      this.setState(
        {
          shouldSubmit: false,
        },
        // only submit the filters if search form is applied on home page.
        isHomePage ? () => {
          this.handleSubmit();
          onSubmit({
            source,
            raag,
            writer,
            type,
            query,
          });
        } : null
      );
    }
  }

  isQueryAllowed = (query, type = this.state.type) => {
    // Different search types have different criteria to tell if it's safe query to be allowed to enter or not
    if (query) {
      switch (type) {
        case SEARCH_TYPES.MAIN_LETTERS: {
          const lagamatras = SEARCH_TYPES_NOT_ALLOWED_KEYS[SEARCH_TYPES.MAIN_LETTERS];
          const lagamatrasRegExp = new RegExp(lagamatras.join('|'));

          // if it's not allowed key, then return false
          if (lagamatrasRegExp.test(query)) {
            return false;
          }
        }
          break;
      }
    }
    return true;
  }

  // Retuns a function
  setGurmukhiKeyboardVisibilityAs = value => () => {
    if (value !== this.state.displayGurmukhiKeyboard) {
      this.setState({ displayGurmukhiKeyboard: value }, () => {
        clickEvent({
          action: ACTIONS.GURMUKHI_KEYBOARD,
          label: value ? 1 : 0,
        });
      });
    }
  }

  setQueryAs = value => () =>
    this.stopPlaceholderAnimation().then(() => {
      return this.setState(() => ({
        query: value,
        shouldSubmit:
          this.props.submitOnChangeOf.includes('query') && value !== '',
      }))
    })

  handleKeyDown = (e) => {
    switch (this.state.type) {
      case SEARCH_TYPES.MAIN_LETTERS: {
        const lagamatras = SEARCH_TYPES_NOT_ALLOWED_KEYS[SEARCH_TYPES.MAIN_LETTERS];
        const isPressedKeyNotAllowed = lagamatras.some((key) => key === e.key);
        // if it's not allowed key, then return false
        if (isPressedKeyNotAllowed) {
          e.preventDefault();
          return false;
        }
      }
        break;
    }

    return true;
  }


  handleSearchChange = ({ target }) => {
    const query = target.value
    if (this.isQueryAllowed(query)) {
      const cursorStart = target.selectionStart;
      const cursorEnd = target.selectionEnd;

      this.setQueryAs(query)().then(() => {
        if (cursorStart !== null) {
          return target.setSelectionRange(cursorStart, cursorEnd)
        }
      });
    }
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

  handleSearchRaagChange = ({ currentTarget: { value } }) => {
    const newRaag = parseInt(value, 10);
    this.setState((previousState) => {
      return {
        ...previousState,
        raag: newRaag,
        shouldSubmit:
          this.props.submitOnChangeOf.includes('raag') &&
          this.state.query !== '',
      }
    },
      () => {
        clickEvent({
          action: ACTIONS.SEARCH_RAAG,
          label: newRaag,
        });
        localStorage.setItem(
          LOCAL_STORAGE_KEY_FOR_SEARCH_RAAG,
          newRaag
        );
      })
  }

  handleSearchWriterChange = ({ currentTarget: { value } }) => {
    const newWriter = parseInt(value, 10);
    this.setState((previousState) => {
      return {
        ...previousState,
        writer: newWriter,
        shouldSubmit:
          this.props.submitOnChangeOf.includes('writer') &&
          this.state.query !== '',
      }
    }, () => {
      clickEvent({
        action: ACTIONS.SEARCH_WRITER,
        label: newWriter,
      });
      localStorage.setItem(
        LOCAL_STORAGE_KEY_FOR_SEARCH_WRITER,
        newWriter
      );
    })
  }

  handleSearchTypeChange = ({ currentTarget: { value } }) => {
    const { type: currentSearchType, query, source, displayGurmukhiKeyboard } = this.state;
    const newSearchType = Number(value);
    const isSearchTypeToAngSearchType = currentSearchType !== SEARCH_TYPES.ANG && newSearchType === SEARCH_TYPES.ANG;
    const isSearchTypeToMainLetterSearchType = currentSearchType !== SEARCH_TYPES.MAIN_LETTERS && newSearchType === SEARCH_TYPES.MAIN_LETTERS
    const isQueryToBeCleared = isSearchTypeToAngSearchType || (isSearchTypeToMainLetterSearchType && !this.isQueryAllowed(query, newSearchType));


    // We are only showing keyboard :
    // If they falls in the gurmukhi keyboard category && keyboard is already open/active.
    // If keyboard is closed already, no need to set it as active.
    const isShowKeyboard = newSearchType !== SEARCH_TYPES['ANG'] &&
      newSearchType !== SEARCH_TYPES['ENGLISH_WORD'] &&
      newSearchType !== SEARCH_TYPES['ROMANIZED']
      && displayGurmukhiKeyboard;

    handleSearchTypeChange = ({ currentTarget: { value } }) => {
      const {
        type,
        raag,
        writer,
        source,
        query
      } = this.state;
      const { submitOnChangeOf } = this.props;
      const isSearchTypeToAngType = type !== SEARCH_TYPES['ANG'] && Number(value) === SEARCH_TYPES['ANG'];
      debugger;
      this.stopPlaceholderAnimation().then(() =>
        this.setState(
          {
            type: newSearchType,
            source: parseInt(value, 10) === SEARCH_TYPES['ANG'] &&
              Object.keys(SOURCES_WITH_ANG).includes(source) ?
              source : 'G',
            raag,
            writer,
            query: isQueryToBeCleared ? '' : query,
            shouldSubmit: isSearchTypeToAngType ? false :
              submitOnChangeOf.includes('type') &&
              query !== '',
            displayGurmukhiKeyboard: isShowKeyboard
          },
          () => {
            clickEvent({ action: ACTIONS.SEARCH_TYPE, label: newSearchType });
            localStorage.setItem(
              LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE,
              newSearchType
            );
            localStorage.setItem(
              LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE,
              source
            );
            requestAnimationFrame(this.beginPlaceholderAnimation);
          }
        )
      );
    }

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
