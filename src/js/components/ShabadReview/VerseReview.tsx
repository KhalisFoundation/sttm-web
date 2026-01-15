import React, { useEffect, useState } from 'react';
import { TickIcon } from '../Icons/tickIcon';
import { ExclamationIcon } from '../Icons/exclamationIcon';
import { Verse } from './interfaces';
import { CommentIcon } from '../Icons/commentIcon';
import Dialog from '../Modals/Dialog';
import { DiffInput } from '../DiffInput';
import { VerseFeedback } from '@/types/shabad-review';

interface VerseReviewProps {
  verse: Verse;
  currentFeedback: VerseFeedback | null;
  updateFeedback: (feedback: VerseFeedback) => void;
}

const VerseReview: React.FC<VerseReviewProps> = ({ verse, currentFeedback, updateFeedback }) => {
  const [status, setStatus] = useState<'approved' | 'rejected' | ''>('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [suggested, setSuggested] = useState(currentFeedback?.details.suggested || verse.translation?.en?.bdb || '');
  const [comment, setComment] = useState(currentFeedback?.details.comment || '');
  console.log('currentFeedback', currentFeedback);

  useEffect(() => {
    if (status === '' || comment === '') return;
    updateFeedback({
      verseId: verse.verseId,
      status: status,
      details: {
        suggested,
        comment,
      },
    });
  }, [suggested, comment]);

  const approveVerse = () => {
    if (status === 'approved') return;
  
    setStatus('approved');
    updateFeedback({
      verseId: verse.verseId,
      status: 'approved',
      details: {
        suggested: '',
        comment: '',
      },
    });
  }

  const rejectVerse = () => {
    if (status === 'rejected') return;
  
    setStatus('rejected');
    updateFeedback({
      verseId: verse.verseId,
      status: 'rejected',
      details: {
        suggested: '',
        comment: '',
      },
    });
  }

  const addVerseDetails = () => {
    if (status === '') return;

    updateFeedback({
      verseId: verse.verseId,
      status: status,
      details: {
        suggested,
        comment,
      },
    });
    closePopup();
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
            <span>{currentFeedback?.details.suggested || currentFeedback?.details.comment ? 'Edit' : 'Add'} details</span>
            <CommentIcon width={22} />
          </button>
        )}
      </div>
      {isPopupOpen && (
        <Dialog isModalOpen={isPopupOpen} title='Feedback on this verse:' onClose={closePopup}>
          <h4 className='gurbani-verse'>{verse.verse.unicode}</h4>
          <p className='modal-label'>Suggest Edits (optional)</p>
          <DiffInput actualText={verse.translation?.en?.bdb || ''} editedText={suggested} updateText={setSuggested} />
          <p className='modal-label'>What is wrong with translation?</p>
          <textarea placeholder='Enter your feedback here' value={comment} onChange={(e) => {
            setComment(e.target.value);
          }}/>
          <button className='btn btn-primary' onClick={addVerseDetails}>Submit</button>
        </Dialog>
      )}
    </div>
  );
};

export default VerseReview;
