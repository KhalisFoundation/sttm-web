import React from 'react';

interface Props {
  children: React.ReactNode
}

const BackgroundModal = (props: Props) => {
  return (
    <div className="background-modal">
      {props.children}
    </div>
  )
}

export default BackgroundModal
