import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateFavouriteShabad } from '@/components/FavouriteShabadButton/hooks';
import { setIsModalOpen } from '@/features/actions';
import { getShabadId } from '@/util';
import Times from '@/components/Icons/Times';

const AddFavouriteShabadModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.isModalOpen)
  const gurbaniVerses = useSelector(state => state.gurbaniVerses);
  // const verses = gurbaniVerses.map(gurbani => gurbani.verse.unicode);
  const shabadId = getShabadId(gurbaniVerses[0]);
  // const [pankti, setPankti] = useState<string>(verses[0]);
  const [comment, setComment] = useState<string>('');
  const create = useCreateFavouriteShabad()
  const onSave = (e) => {
    e.preventDefault();
    create.mutate({ shabadId, comment });
    dispatch(setIsModalOpen(false))
  }

  return (
    <dialog open={isModalOpen} className='background-modal'>
      <div className='add-fav-shabad-container'>
        <div className='header'>
          <span>Add to Favourites</span>
          <button className='settings-times' aria-label="close" onClick={() => dispatch(setIsModalOpen(false))}><Times /></button>
        </div>
        <div className='content'>
          <form method="dialog" onSubmit={onSave}>
            {/* 
          Release in version..
          <label className="title">Select a line to save as the title:
            <select value={pankti} onChange={(e) => setPankti(e.target.value)}>
              {verses.map((value, idx) =>
                <option key={`${idx}-${value}`}>
                  {value}
                </option>)
              }
            </select>
          </label> 
          */}
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
