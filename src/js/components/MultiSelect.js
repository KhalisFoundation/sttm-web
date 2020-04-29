import React from 'react';
import PropTypes from 'prop-types';
import { DownArrowIcon } from '@/components/Icons/CustomIcons';

export class MultiSelect extends React.PureComponent {
  static propTypes = {
    collections: PropTypes.array.isRequired,
    dropdownLabel: PropTypes.string.isRequired,
  };

  render() {
    const { collections, dropdownLabel } = this.props;

    const collectionsMarkup = collections.map(c => {
      const { options, action, label, checked } = c;
      return (
        <ul key={label}>
          <p>{label}</p>
          {options.map(op => (
            <li key={op}>
              <input type="checkbox"
                value={op}
                id={`checkbox-${label}-${op}`}
                onChange={() => { action(op) }}
                checked={checked.includes(op)} />
              <span className="fake-checkbox" onClick={e => {
                e.currentTarget.previousSibling.click();
              }}></span>
              <label htmlFor={`checkbox-${label}-${op}`}> {op} </label>
            </li>
          ))}
        </ul>
      )
    });

    return (
      <>
        <span className="" onClick={(e) => {
          e.currentTarget.nextSibling.classList.toggle('collapsed');
          e.currentTarget.nextSibling.classList.toggle('expanded');
        }}>{dropdownLabel} <DownArrowIcon /> </span>

        <div className='collapsed list-wrapper'>
          {collectionsMarkup}
        </div>
      </>
    )
  }
}
