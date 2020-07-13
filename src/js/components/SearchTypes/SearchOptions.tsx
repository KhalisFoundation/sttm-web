import React from 'react';

export const SearchOptions = ({ list }: { list: object[] }) => {

  return <>
    {list
      .map((obj) => {
        // There is always just 1 key,value pair
        for (const [key, name] of Object.entries(obj))
          return (
            <option key={key} value={key}>
              {name}
            </option>
          )
      })}
  </>
}