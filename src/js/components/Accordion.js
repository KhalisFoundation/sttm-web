import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { PlusIcon, MinusIcon } from '@/components/Icons/CustomIcons'

const Accordion = ({ title, index, content, defaultState, customStyles }) => {
  const [active, setActive] = useState(defaultState);

  function toggleAccordion() {
    setActive(!active);
  }

  function createContent() {
    if (typeof content === "object") {
      return <section id={`accordion-panel-${index}`} aria-labelledby={`accordion-header-${index}`} className={`content ${active ? 'is-active' : ''}`}>
        {content}
      </section>
    }
    return <section id={`accordion-panel-${index}`} aria-labelledby={`accordion-header-${index}`} className={`content ${active ? 'is-active' : ''}`} dangerouslySetInnerHTML={{ __html: content }} />
  }

  useEffect(() => {
    setActive(defaultState)
  }, [defaultState])

  return (
    <div className="accordion__item">
      <h4>
        <button
          className="title"
          aria-expanded={active}
          aria-controls={`accordion-panel-${index}`}
          id={`accordion-header-${index}`}
          onClick={toggleAccordion}
          aria-label={title}>
          {title}{active ? <MinusIcon /> : <PlusIcon />}
        </button>
      </h4>
      <section id={`accordion-panel-${index}`} aria-labelledby={`accordion-header-${index}`} className={`content ${active ? 'is-active' : ''}`} dangerouslySetInnerHTML={{ __html: content }} />

    </div >
  )
}

Accordion.propTypes = {
  title: PropTypes.any.isRequired,
  content: PropTypes.any.isRequired,
  defaultState: PropTypes.bool,
  index: PropTypes.number.isRequired,
  customStyles: PropTypes.bool,
}

Accordion.default = {
  defaultState: false,
  customStyles: false,
}

export default Accordion;
