import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useCreateFavouriteShabad } from '@/components/FavouriteShabadButton/hooks';
import { getFavouriteVerseOptions } from '@/components/FavouriteShabadButton/utils/get-favourite-verse-options';
import { setModalOpen } from '@/features/actions';
import { getShabadId } from '@/util';
import Dialog from './Dialog';

interface Props {
  isModalOpen: boolean;
}

const AddFavouriteShabadModal = (props: Props) => {
  const dispatch = useDispatch();
  const gurbaniVerses = useSelector((state: { gurbaniVerses?: unknown[] }) => state.gurbaniVerses);
  const options = getFavouriteVerseOptions(gurbaniVerses);
  const [pankti, setPankti] = useState<string | number | undefined>(options[0] && options[0].value);
  const [comment, setComment] = useState<string>('');
  const create = useCreateFavouriteShabad();

  const selectedVerse = Array.isArray(gurbaniVerses)
    ? gurbaniVerses.find((verse: { verseId?: string | number }) => verse.verseId === pankti) || gurbaniVerses[0]
    : undefined;
  const shabadId = getShabadId(selectedVerse);

  const handleShabadSave = (e: FormEvent) => {
    e.preventDefault();
    if (!shabadId || pankti == null) {
      return;
    }
    create.mutate({ shabadId, comment, verseId: pankti });
    dispatch(setModalOpen(''))
  }

  return (
    <Dialog isModalOpen={props.isModalOpen} title="Add to Favourites">
      <form method="dialog" onSubmit={handleShabadSave}>
        <label className="title">Select a line to save as the title:
          {options.length === 0 ? (
            <p>No shabad lines are available to favourite.</p>
          ) : (
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
          )}

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
          <button type="submit" className='btn btn-primary' disabled={options.length === 0 || !shabadId}>Save</button>
        </div>
      </form>
    </Dialog>
  )
}

export default AddFavouriteShabadModal;
