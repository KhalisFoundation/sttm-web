import React from 'react';
import { useSelector } from 'react-redux';
import AddFavouriteShabadModal from './AddFavouriteShabadModal';
import BackgroundModal from './BackgroundModal';

const Modals = () => {

  const { isModalOpen, modalType } = useSelector(store => store)

  if (!isModalOpen) {
    return null;
  }

  const content = () => {
    switch (modalType) {
      case 'addFavouriteShabad':
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
