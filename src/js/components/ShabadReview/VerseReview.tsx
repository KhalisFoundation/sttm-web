import React, { useState } from 'react';
import { TickIcon } from './tickIcon';
import { ExclamationIcon } from './exclamationIcon';
import { Verse } from './interfaces';
import { CommentIcon } from './commentIcon';
import Dialog from '../Modals/Dialog';
import { DiffInput } from '../DiffInput';

interface VerseReviewProps {
  verse: Verse;
}

const VerseReview: React.FC<VerseReviewProps> = ({ verse }) => {
  const [status, setStatus] = useState<'approved' | 'rejected' | ''>('');
  const [isPopupOpen, setPopupOpen] = useState(false);

  const approveVerse = () => {
    setStatus('approved');
  }

  const rejectVerse = () => {
    setStatus('rejected');
  }

  const openPopup = () => {
    setPopupOpen(true);
  }

  const closePopup = () => {
    setPopupOpen(false);
  }

  return (
    <div className={`verse-review ${status}`}>
      <div className="verse-content">
        <p>{verse.verse.unicode}</p>
        <p className="translation">{verse.translation?.en?.bdb}</p>
      </div>
      <div className="review-options">
        <button className='verse-approve-button' onClick={approveVerse}>
          <TickIcon width={20} className={status === 'approved' ? 'active-icon' : ''} />
        </button>
        <button className='verse-reject-button' onClick={rejectVerse}>
          <ExclamationIcon width={20} className={status === 'rejected' ? 'active-icon' : ''} />
        </button>
        {status === 'rejected' && (
          <button className='add-details-button' onClick={openPopup}>
            <span>Add details</span>
            <CommentIcon width={22} />
          </button>
        )}
      </div>
      {isPopupOpen && (
        <Dialog isModalOpen={isPopupOpen} title='Feedback on this verse:' onClose={closePopup}>
          <h4 className='gurbani-verse'>{verse.verse.unicode}</h4>
          <p className='modal-label'>Suggest Edits (optional)</p>
          <DiffInput value={verse.translation?.en?.bdb || ''} />
          <p className='modal-label'>What is wrong with translation?</p>
          <textarea placeholder='Enter your feedback here' />
          <button className='btn btn-primary'>Submit</button>
        </Dialog>
      )}
    </div>
  );
};

export default VerseReview;
