import React from 'react';

export interface Collection {
  options: any,
  action: (attr: any) => {},
  label: string,
  tooltip: string,
  checked: any,
  children?: {}
}

interface CheckboxesProps {
  collections: Collection[]
}

const Checkboxes = (props: CheckboxesProps) => {
  const { collections } = props;

  const toggleCheckBox = (op: any, action: any) => () => {
    action(op);
  }

  const childrenCollectionsMarkup = (collection: any) => {
    const { options, action, label, checked } = collection;
    return (
      <ul key={label} className="checkbox-child-container">
        {
          options.map((option: any, index) => {
            return (
              <li className="item" key={`${option}-${index}`}>
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
            )
          })
        }
      </ul>
    )
  }

  const collectionsMarkup = collections.map((c) => {
    const { options, action, label, checked, children } = c;

    return (
      <ul key={label} className="checkbox-container">
        {options.map((option: string) => {
          const childUl = (children && children.hasOwnProperty(option)) ? childrenCollectionsMarkup(children[option]) : null
          return (
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
              {childUl}
            </li>
          )
        })}
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
