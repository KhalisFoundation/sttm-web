import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Accordion = ({title, content, defaultState = false}) => {
  const [active, setActive] = useState(defaultState);

  function toggleAccordion() {
    setActive(!active);
  }

  useEffect(() => {
    setActive(defaultState)
  },[defaultState])

  return (
    <li className={`accordion-item ${active ? 'is-active' : ''}`}>
      <button className="accordion-title" onClick={toggleAccordion}>{title}</button>
      <div className="accordion-content" dangerouslySetInnerHTML={{ __html: content }} />
    </li>
  )
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  defaultState: PropTypes.bool
}

export default Accordion;