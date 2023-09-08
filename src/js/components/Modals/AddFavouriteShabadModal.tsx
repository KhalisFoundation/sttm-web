import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useCreateFavouriteShabad } from '@/components/FavouriteShabadButton/hooks';
import { setIsModalOpen } from '@/features/actions';
import { getShabadId } from '@/util';
import Times from '@/components/Icons/Times';

const AddFavouriteShabadModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.isModalOpen)
  const gurbaniVerses = useSelector(state => state.gurbaniVerses);
  const options = gurbaniVerses.map(gurbani => {
    return (
      {
        label: gurbani.verse.gurmukhi,
        value: gurbani.verseId,
      }
    )
  });

  const shabadId = getShabadId(gurbaniVerses[0]);
  const [pankti, setPankti] = useState<string>(options[0].value);
  const [comment, setComment] = useState<string>('');
  const create = useCreateFavouriteShabad();

  const handleShabadSave = (e) => {
    e.preventDefault();
    create.mutate({ shabadId, comment, verseId: pankti });
    dispatch(setIsModalOpen(false))
  }

  return (
    <dialog open={isModalOpen} className='background-modal'>
      <div className='add-fav-shabad'>
        <div className='header'>
          <span>Add to Favourites</span>
          <button className='settings-times' aria-label="close" onClick={() => dispatch(setIsModalOpen(false))}><Times /></button>
        </div>
        <div className='content'>
          <form method="dialog" onSubmit={handleShabadSave}>
            <label className="title">Select a line to save as the title:
              <Select options={options} className="dropdown" value={pankti} onChange={(value) => {
                if (value) {
                  setPankti(value)
                }
              }} />
                
            </label>

            <label className='title'>Notes:
              <textarea
                name="comment"
                rows={4}
                cols={30}
                style={{ resize: "none" }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="textarea"
                autoFocus
              />
            </label>
            <div className="save-btn">
              <button type="submit" className='btn btn-primary'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default AddFavouriteShabadModal;
