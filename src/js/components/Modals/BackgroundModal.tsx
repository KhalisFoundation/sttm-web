import React from 'react';

interface IProps {
  children: React.ReactNode
}

const BackgroundModal = (props: IProps) => {
  return (
    <div className="background-modal">
      {props.children}
    </div>
  )
}

export default BackgroundModal
