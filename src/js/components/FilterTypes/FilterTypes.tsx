import React from 'react';

export const FilterTypes = () => {
  return (<div>
    <select
      name="type"
      id="search-type"
      value={type}
      onChange={handleSearchTypeChange}
    >
      {TYPES.map((children, value) => (
        <option key={value} value={value}>
          {children}
        </option>
      ))}
    </select>
    {
      parseInt(type) === SEARCH_TYPES['ANG'] ? (
        <select
          name="source"
          value={Object.keys(SOURCES_WITH_ANG).includes(source) ? source : 'G'}
          onChange={handleSearchSourceChange}
        >
          {Object.entries(SOURCES_WITH_ANG).map(([value, children]) => (
            <option key={value} value={value}>
              {children}
            </option>
          ))}
        </select>
      ) : (
          <select
            name="source"
            value={source}
            onChange={handleSearchSourceChange}
          >
            {Object.entries(SOURCES).map(([value, children]) => (
              <option key={value} value={value}>
                {children}
              </option>
            ))}
          </select>)
    }
  </div>)
};
