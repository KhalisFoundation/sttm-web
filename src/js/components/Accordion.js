import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Chevron from '@/components/Icons/Chevron';

const Accordion = ({ title, index, content, defaultState, ariaLabel }) => {
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
          aria-label={ariaLabel ? ariaLabel : title}
        >
          {title}
          {active ? (
            <Chevron
              style={{ fontSize: 16 }}
              direction={Chevron.DIRECTIONS.TOP}
            />
          ) : (
            <Chevron
              style={{ fontSize: 16 }}
              direction={Chevron.DIRECTIONS.BOTTOM}
            />
          )}
        </button>
      </h4>
      {createContent()}
    </div>
  );
}

Accordion.propTypes = {
  title: PropTypes.any.isRequired,
  content: PropTypes.any.isRequired,
  defaultState: PropTypes.bool,
  index: PropTypes.number.isRequired,
  customStyles: PropTypes.bool,
  ariaLabel: PropTypes.string,  // Use only to override title
}

Accordion.default = {
  defaultState: false,
  customStyles: false,
}

export default Accordion;
