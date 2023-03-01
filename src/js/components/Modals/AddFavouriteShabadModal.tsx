/* eslint-disable no-console */
import React from 'react';
import Times from '@/components/Icons/Times';

const AddFavouriteShabadModal = () => {

  const onClick = () => console.log('close modal');
  
  return (
    <div className='add-fav-shabad-container'>
      <div className='header'>
        <span>Add to Favourites</span>
        {/* Close button */}
        <button className='settings-times' aria-label="close" onClick={onClick}><Times /></button>
      </div>
      {/* select dropdown of shabads lines to select as title */}
      {/* textarea notes to save as comments */}
    </div>
  )
}

export default AddFavouriteShabadModal;
