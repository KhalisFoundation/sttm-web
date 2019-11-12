import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArrowIcon from './Icons/Arrow';
import SpaceBar from './Icons/Spacebar';

const defaultMatraValue = {
  w: 'Aw',
  i: 'ie',
  I: 'eI',
  u: 'au',
  U: 'aU',
  y: 'ey',
  Y: 'AY',
  o: 'Ao',
  O: 'AO',
  M: ' M',
  '`': ' `',
  R: ' R',
  H: ' H',
  ' ': ' '
};

let matras = Object.keys(defaultMatraValue);
matras.push('a');

const getButtonValue = (button, query) => {
  const labelVal = Object.keys(defaultMatraValue).includes(button) ?
    matraAkhar(button, query) : button;
  const lastChar = query[query.length - 1];
  if (lastChar && lastChar.includes(labelVal)) {
    return button;
  } else {
    return labelVal;
  }
}

const matraAkhar = (matra, query) => {
  const lastChar = query[query.length - 1];
  const matraValue = defaultMatraValue[matra];
  const notMatraRegex = new RegExp("[^" + matra + "]", "g");

  if (query.length && !matras.includes(lastChar)) {
    return matraValue.replace(notMatraRegex, lastChar);
  } else {
    return matraValue;
  }
}

const withoutMatra = [
  ['a', 'A', 'e', 's', 'h', 'k', 'K', 'g', 'G', '|'],
  ['c', 'C', 'j', 'J', '\\', 't', 'T', 'f', 'F', 'x'],
  ['q', 'Q', 'd', 'D', 'n', 'p', 'P', 'b', 'B', 'm'],
  ['X', 'r', 'l', 'v', 'V', 'meta'],
];

const withMatra = [
  ['w', 'i', 'I', 'u', 'U', 'y', 'Y', 'o', 'O', 'M'],
  ['a', 'A', 'e', 's', 'h', 'k', 'K', 'g', 'G', '`'],
  ['c', 'C', 'j', 'J', 't', 'T', 'f', 'F', 'x', 'H'],
  ['q', 'Q', 'd', 'D', 'n', 'p', 'P', 'b', 'B', 'm'],
  ['X', 'r', 'l', 'v', 'V', 'R', '^', 'space', 'meta'],
];

const keyboardGrid = [
  [withoutMatra], // Keyboard for First letter each word from start (Gurmukhi)
  [withoutMatra], // Keyboard for First letter each word from Anywhere (Gurmukhi)
  [withMatra], // Keyboard for Full Word (Gurmukhi)
  [], // Keyboard for Full Word Translation (English)
  [], // Keyboard for Romanized Gurmukhi (English)
  [], // Keyboard for Ang
];

export default class EnhancedGurmukhiKeyboard extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    searchType: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    onKeyClick: PropTypes.func.isRequired,
    onClose: PropTypes.func,
  };

  state = {
    page: 1,
  };

  handleBackspace = () =>
    this.props.onKeyClick(
      this.props.value.substring(0, this.props.value.length - 1)
    );

  handleSpace = () =>
    this.props.onKeyClick(
      this.props.value + " "
    );

  handleClick = ({
    target: {
      dataset: { value },
    },
  }) => {
    const currentQuery = this.props.value;
    const lastChar = currentQuery[currentQuery.length - 1];
    let newValue;
    if (!matras.includes(lastChar) &&
      value.includes(lastChar) &&
      value !== lastChar) {
      newValue = `${currentQuery.substring(0, currentQuery.length - 1)}${value}`;
    } else {
      newValue = `${currentQuery}${value}`;
    }
    this.props.onKeyClick(newValue);
  };

  componentDidMount() {
    addEventListener('click', this.closeOnOutsideClick);
  }

  closeOnOutsideClick = e => {
    const path =
      typeof e.composedPath === 'function' ? e.composedPath() : e.path || [];

    // If path is empty, let's assume browser doesn't support it and don't do anything.
    if (path.length === 0) {
      return;
    }

    if (
      path.some(
        ({ classList = null }) =>
          classList &&
          (classList.contains('gurmukhi-keyboard') ||
            classList.contains('gurmukhi-keyboard-toggle'))
      ) === false &&
      typeof this.props.onClose === 'function'
    ) {
      this.props.onClose();
    }
  };

  componentWillUnmount() {
    removeEventListener('click', this.closeOnOutsideClick);
  }

  render() {
    const spaceKey = (
      <button
        type="button"
        data-action="space"
        title="Space"
        onClick={this.handleSpace}
      >
        <SpaceBar />
      </button>
    );

    const meta = (
      <span>
        <button
          type="button"
          data-action="bksp"
          title="Backspace"
          onClick={this.handleBackspace}
        >
          <ArrowIcon />
        </button>
        <Link to="/help#Web-how-to-type-gurmukhi-with-keyboard">
          <button type="button">?</button>
        </Link>
      </span>
    );
    return (
      <div
        className={`gurmukhi-keyboard gurbani-font ${
          this.props.active ? 'active' : ''
          }`}
        onClick={this.click}
      >
        {
          keyboardGrid[parseInt(this.props.searchType)].map(
            (rows, index) => {
              return (
                <div
                  className="page"
                  key={index}
                  id={`gurmukhi-keyboard-page-${index + 1}`}
                >
                  {rows.map((chars, rowIndex) => (
                    <div key={`${index}-${rowIndex}`} className="keyboard-row">
                      <div className="keyboard-row-set">
                        {
                          chars.map((button, i) => {
                            if (button === 'meta') {
                              return meta;
                            } else if (button === 'space') {
                              return spaceKey;
                            }
                            return (
                              <button key={i}
                                data-value={getButtonValue(button, this.props.value)}
                                type="button"
                                className={
                                  Object.keys(defaultMatraValue).includes(button) ? 'matra-button' : ''
                                }
                                onClick={this.handleClick}>
                                {
                                  Object.keys(defaultMatraValue).includes(button) ?
                                    matraAkhar(button, this.props.value) : button
                                }
                              </button>
                            )
                          })
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          )
        }
      </div>
    );
  }
}
