import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { PlusIcon, MinusIcon } from '@/components/Icons/CustomIcons'

const Accordion = ({title, content, defaultState = false}) => {
  const [active, setActive] = useState(defaultState);

  function toggleAccordion() {
    setActive(!active);
  }

  useEffect(() => {
    setActive(defaultState)
  },[defaultState])

  return (
    <li className={`accordion__item ${active ? 'is-active' : ''}`}>
      <button className="title" onClick={toggleAccordion} aria-label={title}>
        <h3>{title}</h3>
        {
          active
          ?  <MinusIcon />
          : <PlusIcon />
        }
      </button>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </li>
  )
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  defaultState: PropTypes.bool
}

export default Accordion;