import React from 'react';

interface Collection {
  options: any,
  action: () => {},
  label: string,
  checked: any
}
interface CheckboxesProps {
  collections: Collection[]
}

const Checkboxes = (props: CheckboxesProps) => {
  const { collections } = props;

  const toggleCheckBox = (op, action) => () => {
    action(op);
  }

  const collectionsMarkup = collections.map((c) => {
    const { options, action, label, checked } = c;

    return (
      <ul key={label} className="checkbox-container">
        {options.map((option: string) => (
          <li key={option} className="checkbox-item">
            <input
              id={`checkbox-${label}-${option}`}
              type="checkbox"
              value={option}
              onChange={() => action(option)}
              checked={checked.includes(option)}
              className="checkbox-input" />
            <span
              className={`fake-checkbox check-${option}`}
              onClick={toggleCheckBox(option, action)} >
            </span>
            <label
              htmlFor={`checkbox-${label}-${option}`}
              className="checkbox-item-label">
              {option}
            </label>
          </li>
        ))}
      </ul>
    )
  });

  return (
    <>
      {collectionsMarkup}
    </>
  )
}


export default Checkboxes;
