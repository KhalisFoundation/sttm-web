import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArrowIcon from './Icons/Arrow';

const ButtonList = ({ query, onButtonClick, buttons = [] }) =>
  buttons.map((button, i) => (
    <button key={i} data-value={getButtonValue(button, query)} type="button" onClick={onButtonClick}>
      {Object.keys(defaultMatraValue).includes(button) ? matraAkhar(button, query) : button}
    </button>
  ));

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
  H: ' H'
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

const keyboardGrid = [
  [
    ['w', 'i', 'I', 'u', 'U', 'y', 'Y', 'o', 'O', '<-'],
    ['a', 'A', 'e', 's', 'h', 'k', 'K', 'g', 'G', 'M'],
    ['c', 'C', 'j', 'J', 't', 'T', 'f', 'F', 'x', '`'],
    ['q', 'Q', 'd', 'D', 'n', 'p', 'P', 'b', 'B', 'm'],
    ['X', 'r', 'l', 'v', 'V', 'R', 'H', '^']
  ],
  [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    ['N', 'W', '~', '˜', '´', 'Í', 'Ï'],
    ['ç', 'E', '^', '\u00a0', '\u00a0'],
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
    const currentValue = this.props.value;
    const lastChar = currentValue[currentValue.length - 1];
    let newValue;
    if (!matras.includes(lastChar) && value.includes(lastChar)) {
      newValue = `${currentValue.substring(0, currentValue.length - 1)}${value}`;
    } else {
      newValue = `${currentValue}${value}`;
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
    const meta = (
      <div className="keyboard-row-set">
        <button type="button">{'\u00a0'}</button>
        {[1, 2].map(page => (
          <button
            key={page}
            type="button"
            data-action={`page-${page}`}
            title={`Page ${page}`}
            onClick={this.handlePageClick(page)}
            className={this.state.page === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          data-action="bksp"
          title="Backspace"
          onClick={this.handleBackspace}
        >
          <ArrowIcon />
        </button>
      </div>
    );
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
                {rows.map((chars, rowIndex) => (
                  <div key={`${index}-${rowIndex}`} className="keyboard-row">
                    <div className="keyboard-row-set">
                      <ButtonList
                        onButtonClick={this.handleClick}
                        buttons={chars}
                        query={this.props.value}
                      />
                    </div>

                    {rowIndex === length - 1 ? (
                      meta
                    ) : (
                        <div className="keyboard-row-set">
                          <ButtonList
                            onButtonClick={this.handleClick}
                            buttons={chars}
                          />
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    );
  }
}
