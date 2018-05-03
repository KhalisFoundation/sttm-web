import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArrowIcon from './Icons/Arrow';

const ButtonList = ({ buttons = [] }) =>
  buttons.map((button, i) => (
    <button key={i} type="button">
      {button}
    </button>
  ));

export default class GurmukhiKeyboard extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onKeyClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  // Instead of attaching click to each button, we are using event delegation.
  click = ({ target: _$button, currentTarget: $keyboard }) => {
    const { value, onKeyClick, onClose } = this.props;
    const $button =
      _$button.nodeName.toUpperCase() === 'I' ? _$button.parentNode : _$button;
    const { action } = $button.dataset;

    switch (action) {
      case 'close': {
        onClose();
        break;
      }
      case 'bksp': {
        onKeyClick(value.substring(0, value.length - 1));
        break;
      }
      case 'page-1':
      case 'page-2': {
        [...$keyboard.querySelectorAll('.page')].forEach(e => {
          e.style.display = 'none';
        });
        document.getElementById(`gurmukhi-keyboard-${action}`).style.display =
          'block';
        break;
      }
      case 'help':
        break;
      default: {
        onKeyClick(value + ($button.dataset.value || $button.innerText));
      }
    }
  };

  render() {
    return (
      <div
        className={`gurmukhi-keyboard gurbani-font ${
          this.props.active ? 'active' : ''
        }`}
        onClick={this.click}
      >
        <div
          className="page"
          style={{ display: 'block' }}
          id="gurmukhi-keyboard-page-1"
        >
          <div className="keyboard-row">
            <div className="keyboard-row-set">
              <ButtonList buttons={['a', 'A', 'e', 's', 'h']} />
            </div>
            <div className="keyboard-row-set">
              <ButtonList buttons={['k', 'K', 'g', 'G', '|']} />
            </div>
          </div>
          <div className="keyboard-row">
            <div className="keyboard-row-set">
              <ButtonList buttons={['c', 'C', 'j', 'J', '\\']} />
            </div>
            <div className="keyboard-row-set">
              <ButtonList buttons={['t', 'T', 'f', 'F', 'x']} />
            </div>
          </div>
          <div className="keyboard-row">
            <div className="keyboard-row-set">
              <ButtonList buttons={['q', 'Q', 'd', 'D', 'n']} />
            </div>
            <div className="keyboard-row-set">
              <ButtonList buttons={['p', 'P', 'b', 'B', 'm']} />
            </div>
          </div>
          <div className="keyboard-row">
            <div className="keyboard-row-set">
              <ButtonList buttons={['X', 'r', 'l', 'v', 'V']} />
            </div>
            <div className="keyboard-row-set">
              <button type="button">{'\u00a0'}</button>
              <button type="button" data-action="page-1" className="active">
                1
              </button>
              <button type="button" data-action="page-2">
                2
              </button>
              <button type="button" data-action="bksp">
                <ArrowIcon />
              </button>

              <Link to="/help#Web-how-to-type-gurmukhi-with-keyboard">
                <button data-action="help" type="button">
                  ?
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="page" id="gurmukhi-keyboard-page-2">
          <div className="keyboard-row">
            <div className="keyboard-row-set">
              <ButtonList buttons={[1, 2, 3, 4, 5]} />
            </div>
            <div className="keyboard-row-set">
              <ButtonList buttons={[6, 7, 8, 9, 0]} />
            </div>
          </div>
          <div className="keyboard-row">
            <div className="keyboard-row-set">
              <ButtonList buttons={['w', 'i', 'I', 'u', 'U']} />
            </div>
            <div className="keyboard-row-set">
              <ButtonList buttons={['y', 'Y', 'o', 'O', 'M']} />
            </div>
          </div>
          <div className="keyboard-row">
            <div className="keyboard-row-set">
              <ButtonList buttons={['N', 'W', '`', '~', 'R']} />
            </div>
            <div className="keyboard-row-set">
              <ButtonList buttons={['H', '˜', '´', 'Í', 'Ï']} />
            </div>
          </div>
          <div className="keyboard-row">
            <div className="keyboard-row-set">
              <ButtonList buttons={['ç', 'E', '^', '\u00a0', '\u00a0']} />
            </div>
            <div className="keyboard-row-set">
              <button type="button">{'\u00a0'}</button>
              <button type="button" data-action="page-1">
                1
              </button>
              <button type="button" data-action="page-2" className="active">
                2
              </button>
              <button type="button" data-action="bksp">
                <ArrowIcon />
              </button>
              <Link to="/help#Web-how-to-type-gurmukhi-with-keyboard">
                <button data-action="help" type="button">
                  ?
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
