import React from 'react';
import BackgroundModal from './BackgroundModal';
import AddFavouriteShabadModal from './AddFavouriteShabadModal';

const Modals = () => {
  
  const modalType = 'addFavShabad';//for testing

  const isModalOpen = true; //for testing
  
  if(!isModalOpen) {
    return null;
  }
  
  const content = () => {
    switch(modalType) {
      case 'addFavShabad' : 
        return <AddFavouriteShabadModal />
      default:
        return null;  
    }
  }
  return (
    <BackgroundModal>{content()}</BackgroundModal>
  )
}

export default Modals;
