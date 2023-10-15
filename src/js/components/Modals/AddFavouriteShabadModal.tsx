import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useCreateFavouriteShabad } from '@/components/FavouriteShabadButton/hooks';
import { setModalOpen } from '@/features/actions';
import { getShabadId } from '@/util';
import Dialog from './Dialog';

interface Props {
  isModalOpen: boolean;
}

const AddFavouriteShabadModal = (props: Props) => {
  const dispatch = useDispatch();
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

  const handleShabadSave = (e: FormEvent) => {
    e.preventDefault();
    create.mutate({ shabadId, comment, verseId: pankti });
    dispatch(setModalOpen(''))
  }

  return (
    <Dialog isModalOpen={props.isModalOpen} title="Add to Favourites">
      <form method="dialog" onSubmit={handleShabadSave}>
        <label className="title">Select a line to save as the title:
          <Select
            options={options}
            defaultValue={options[0]}
            className="dropdown"
            classNamePrefix="react-select"
            noOptionsMessage={() => null}
            onChange={(val) => {
              if (val) {
                setPankti(val.value)
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
    </Dialog>
  )
}

export default AddFavouriteShabadModal;
