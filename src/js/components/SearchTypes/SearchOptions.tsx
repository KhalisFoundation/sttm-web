import React from 'react';

export const SearchOptions = ({ list }: { list: object | string[] }) => {

  let listToRender = list;

  // This means it's an array and we need to convert it.
  if (Array.isArray(listToRender)) {
    listToRender = { ...listToRender };
  }

  const listEntries = Object.entries(listToRender);

  return <>
    {listEntries
      .map(([key, name]) => {
        return (
          <option key={key} value={key}>
            {name}
          </option>
        )
      })}
  </>
}