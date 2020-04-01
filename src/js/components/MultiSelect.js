import React from 'react';
import PropTypes from 'prop-types';

export class MultiSelect extends React.PureComponent {
  static propTypes = {
    options: PropTypes.array.isRequired,
    checkedValues: PropTypes.array.isRequired,
    label: PropTypes.string,
    action: PropTypes.func,
  };

  render() {
    const { options, action, label, checkedValues } = this.props;

    return (
      <>
        <span className="" onClick={(e) => {
          e.currentTarget.nextSibling.classList.toggle('collapsed');
          e.currentTarget.nextSibling.classList.toggle('expanded');
        }}>{label} <img src="/assets/images/down-arrow.svg" width="12px" /></span>

        <ul className='collapsed'>
          {options.map(op => (
            <li key={op}>
              <input type="checkbox"
                value={op}
                id={`checkbox-${label}-${op}`}
                onChange={() => { action(op) }}
                checked={checkedValues.includes(op)} />
              <span className="fake-checkbox" onClick={e => {
                e.currentTarget.previousSibling.click();
              }}></span>
              <label htmlFor={`checkbox-${label}-${op}`}> {op} </label>
            </li>
          ))}
        </ul>
      </>
    )
  }
}
