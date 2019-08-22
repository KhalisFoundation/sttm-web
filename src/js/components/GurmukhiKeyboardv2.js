import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArrowIcon from './Icons/Arrow';

const ButtonList = ({ onButtonClick, buttons = [] }) =>
  buttons.map((button, i) => (
    <button key={i} data-value={button} type="button" onClick={onButtonClick}>
      {Object.keys(matraAkhar).includes(button) ? matraAkhar[button] : button}
    </button>
  ));

const defaultMatraValue = {
  w: 'Aw',
  i: 'ie',
  I: 'eI',
  u: 'au',
  U: 'aU',
  y: 'ey',
  Y: 'Ay',
  o: 'Ao',
  O: 'AO',
};

const matraAkhar = matra => {
  const inputValue = document.querySelector("#search").value;
  const lastChar = inputValue[inputValue.length - 1];
  if (Object.keys(defaultMatraValue).includes(lastChar)) {
    return defaultMatraValue[matra];
  } else {
    const defaultVal = defaultMatraValue[matra];
    return defaultVal.replace
  }
}

const keyboardGrid = [
  [
    Object.keys(defaultMatraValue),
    ['a', 'A', 'e', 's', 'h', 'k', 'K', 'g', 'G', 'M'],
    ['c', 'C', 'j', 'J', 't', 'T', 'f', 'F', 'x', '`'],
    ['q', 'Q', 'd', 'D', 'n', 'p', 'P', 'b', 'B', 'm'],
    ['X', 'r', 'l', 'v', 'V', 'R', 'H', '^']
  ],
  [
    [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]],
    [['N', 'W',  '~', '˜', '´', 'Í', 'Ï']],
    [['ç', 'E', '^', '\u00a0', '\u00a0']],
  ],
];

export default class EnhancedGurmukhiKeyboard extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
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

  handlePageClick = page => () => this.setState({ page });

  handleClick = ({
    target: {
      dataset: { value },
    },
  }) => {
    this.props.onKeyClick(`${this.props.value}${value}`);
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
    return (
      <div
        className={`gurmukhi-keyboard gurbani-font ${
          this.props.active ? 'active' : ''
        }`}
        onClick={this.click}
      >
      {keyboardGrid.map(
        (rows, index) =>
            index + 1 === this.state.page && (
              <div
                className="page"
                key={index}
                id={`gurmukhi-keyboard-page-${index + 1}`}
              >
              {rows.map( (chars, rowIndex) => (
                <div key={`${index}-${rowIndex}`} className="keyboard-row">
                  <div className="keyboard-row-set">
                    <ButtonList
                      onButtonClick={this.handleClick}
                      buttons={chars}
                    />
                  </div>
                </div>
              ))}
              </div>
            )
      )}
      </div>
    );
  }
}
