import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { PlusIcon, MinusIcon } from '@/components/Icons/CustomIcons'

const Accordion = ({ title, index, content, defaultState = false }) => {
  const [active, setActive] = useState(defaultState);

  function toggleAccordion() {
    setActive(!active);
  }

  useEffect(() => {
    setActive(defaultState)
  }, [defaultState])

  return (
    <div className="accordion__item">
      <h3>
        <button
          className="title"
          aria-expanded={active}
          aria-controls={`accordion-panel-${index}`}
          id={`accordion-header-${index}`}
          onClick={toggleAccordion}
          aria-label={title}>
          {title}{active ? <MinusIcon /> : <PlusIcon />}
        </button>
      </h3>
      <section id={`accordion-panel-${index}`} aria-labelledby={`accordion-header-${index}`} className={`content ${active ? 'is-active' : ''}`} dangerouslySetInnerHTML={{ __html: content }} />
    </div >
  )
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  defaultState: PropTypes.bool,
  index: PropTypes.number.isRequired,
}

export default Accordion;
