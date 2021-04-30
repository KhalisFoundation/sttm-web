import React from 'react'
import CrossIcon from './Icons/Times';

const ClearSearchButton = ({clickHandler}) => {
  return <button
    type="button"
    className="clear-search-toggle"
    onClick={clickHandler('')}
    aria-label="clear search"
  >
    <CrossIcon />
  </button>
}

export default ClearSearchButton;