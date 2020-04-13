import React from 'react';
import PropTypes from 'prop-types';

export class MultiSelect extends React.PureComponent {
  static propTypes = {
    collections: PropTypes.array.isRequired,
  };

  render() {
    const { collections } = this.props;

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
        }}>Display Options <img src="/assets/images/down-arrow.svg" width="12px" /></span>

        <div className='collapsed list-wrapper'>
          {collectionsMarkup}
        </div>
      </>
    )
  }
}
