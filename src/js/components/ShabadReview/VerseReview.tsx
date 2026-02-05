import React, { useEffect, useState } from 'react';
import { TickIcon } from '../Icons/tickIcon';
import { ExclamationIcon } from '../Icons/exclamationIcon';
import { Verse } from './interfaces';
import { CommentIcon } from '../Icons/commentIcon';
import Dialog from '../Modals/Dialog';
import { DiffInput } from '../DiffInput';
import { VerseFeedback, AI_Translation_Text } from '@/types/shabad-review';

interface VerseReviewProps {
  verse: Verse;
  currentFeedback: VerseFeedback | null;
  updateFeedback: (feedback: VerseFeedback) => void;
}

const VerseReview: React.FC<VerseReviewProps> = ({ verse, currentFeedback, updateFeedback }) => {
  const [status, setStatus] = useState<'approved' | 'rejected' | ''>('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [comment, setComment] = useState(currentFeedback?.details.comment || '');
  const [translationText, setTranslationText] = useState('');
  const [suggested, setSuggested] = useState(currentFeedback?.details.suggested || '');
  const [translationId, setTranslationId] = useState(0);

  useEffect(() => {
    if (currentFeedback) {
      if (currentFeedback.status !== status) setStatus(currentFeedback.status);
      if (currentFeedback.details.comment !== comment) setComment(currentFeedback.details.comment);
      if (currentFeedback.details.suggested !== suggested) setSuggested(currentFeedback.details.suggested);
      if (currentFeedback.translationId && currentFeedback.translationId !== translationId) {
        setTranslationId(currentFeedback.translationId);
      }
    }
  }, [currentFeedback]);

  useEffect(() => {
    const verseIds = [verse.verseId]
    try {
      fetch('/api/ai-translations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verse_id: verseIds })
      }).then(response => {
        response.json().then(data => {
          const aiTranslation = data.verses[verse.verseId];
          if (aiTranslation) {
            let text = '';
            
            aiTranslation.text.forEach((item: AI_Translation_Text) => {
              text += item.translation_text + ' ';
              setTranslationId(item.translation_id);
            });
            setTranslationText(`${text}`.trim());
            setSuggested(`${text}`.trim());
          }
        });
      });
    } catch (error) {
      console.error('Error fetching AI translations:', error);
    }
  }, [verse]);

  useEffect(() => {
    if (status === '' || comment === '') return;
    updateFeedback({
      verseId: verse.verseId,
      status: status,
      translationId,
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
      translationId: translationId,
      details: {
        suggested: translationText,
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
      translationId,
      details: {
        suggested: translationText,
        comment: '',
      },
    });
  }

  const addVerseDetails = () => {
    if (status === '') return;

    updateFeedback({
      verseId: verse.verseId,
      status: status,
      translationId,
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
        <p className="translation">{translationText}</p>
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
          <DiffInput actualText={translationText || ''} editedText={suggested} updateText={setSuggested} />
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
