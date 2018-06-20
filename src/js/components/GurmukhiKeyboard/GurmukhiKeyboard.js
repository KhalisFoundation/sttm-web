import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArrowIcon from '@/components/Icons/Arrow';

const ButtonList = ({ onButtonClick, buttons = [] }) =>
  buttons.map((button, i) => (
    <button key={i} data-value={button} type="button" onClick={onButtonClick}>
      {button}
    </button>
  ));

const keyboardGrid = [
  [
    [['a', 'A', 'e', 's', 'h'], ['k', 'K', 'g', 'G', '|']],
    [['c', 'C', 'j', 'J', '\\'], ['t', 'T', 'f', 'F', 'x']],
    [['q', 'Q', 'd', 'D', 'n'], ['p', 'P', 'b', 'B', 'm']],
    [['X', 'r', 'l', 'v', 'V']],
  ],
  [
    [[1, 2, 3, 4, 5], [6, 7, 8, 9, 0]],
    [['w', 'i', 'I', 'u', 'U'], ['y', 'Y', 'o', 'O', 'M']],
    [['N', 'W', '`', '~', 'R'], ['H', '˜', '´', 'Í', 'Ï']],
    [['ç', 'E', '^', '\u00a0', '\u00a0']],
  ],
];

export default class GurmukhiKeyboard extends React.PureComponent {
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
  }) => this.props.onKeyClick(`${this.props.value}${value}`);

  componentDidMount() {
    addEventListener('click', this.windowEventListener);
  }

  windowEventListener = ({ path }) => {
    if (
      path.some(
        ({ classList = null }) =>
          classList &&
          (classList.contains('gurmukhi-keyboard') ||
            classList.contains('gurmukhi-keyboard-toggle'))
      ) === false
    ) {
      this.props.onClose();
    }
  };

  componentWillUnmount() {
    removeEventListener('click', this.windowEventListener);
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
        <Link to="/help#Web-how-to-type-gurmukhi-with-keyboard">
          <button type="button">?</button>
        </Link>
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
                {rows.map(([first, second], rowIndex, { length }) => (
                  <div key={`${index}-${rowIndex}`} className="keyboard-row">
                    <div className="keyboard-row-set">
                      <ButtonList
                        onButtonClick={this.handleClick}
                        buttons={first}
                      />
                    </div>
                    {rowIndex === length - 1 ? (
                      meta
                    ) : (
                      <div className="keyboard-row-set">
                        <ButtonList
                          onButtonClick={this.handleClick}
                          buttons={second}
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
