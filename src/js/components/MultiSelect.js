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
        <p onClick={(e) => {
          e.currentTarget.nextSibling.classList.toggle('hidden');
        }}>{label}</p>

        <ul className="hidden">
          {options.map(op => (
            <li key={op}>
              <input type="checkbox"
                value={op}
                id={`checkbox-${label}-${op}`}
                onChange={() => { action(op) }}
                checked={checkedValues.includes(op)} />
              <label htmlFor={`checkbox-${label}-${op}`}>{op} </label>
            </li>
          ))}
        </ul>
      </>
    )
  }
}
