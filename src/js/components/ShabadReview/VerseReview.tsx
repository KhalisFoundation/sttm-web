import React, { useEffect, useState } from 'react';
import { TickIcon } from '../Icons/tickIcon';
import { ExclamationIcon } from '../Icons/exclamationIcon';
import { Verse } from './interfaces';
import { CommentIcon } from '../Icons/commentIcon';
import Dialog from '../Modals/Dialog';
import { DiffInput } from '../DiffInput';
import { VerseFeedback, AI_Translation_Response } from '@/types/shabad-review';
import { getPssText, getPssTranslationId } from '@/util/ai-translations';
import { TEXTS } from '@/constants/texts';

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
  const [selectedOption, setSelectedOption] = useState<number>(0);

  useEffect(() => {
    if (currentFeedback) {
      if (currentFeedback.status !== status) setStatus(currentFeedback.status);
      if (currentFeedback.details.comment !== comment) setComment(currentFeedback.details.comment);
      if (currentFeedback.details.suggested !== suggested) setSuggested(currentFeedback.details.suggested);
      if (currentFeedback.translationId && currentFeedback.translationId !== translationId) {
        setTranslationId(currentFeedback.translationId);
      }
      const categoryIndex = Object.keys(TEXTS.VERSE_REVIEW_OPTIONS).findIndex(key => TEXTS.VERSE_REVIEW_OPTIONS[key] === currentFeedback.details.category);
      if (categoryIndex !== selectedOption && categoryIndex !== -1) {
        setSelectedOption(categoryIndex);
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
        response.json().then((data: AI_Translation_Response) => {
          const aiTranslation = data.verses && data.verses[verse.verseId];
          if (aiTranslation) {
            const text = getPssText(aiTranslation);
            setTranslationId(getPssTranslationId(aiTranslation));
            setTranslationText(text);
            setSuggested(text);
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
        category: TEXTS.VERSE_REVIEW_OPTIONS[selectedOption],
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
        category: TEXTS.VERSE_REVIEW_OPTIONS[selectedOption],
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
        category: TEXTS.VERSE_REVIEW_OPTIONS[selectedOption],
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
        category: TEXTS.VERSE_REVIEW_OPTIONS[selectedOption],
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
        <span>Prof Sahib Singh&apos;s teeka:
          <p className="gurbani-font translation">{verse.translation?.pu?.ss?.gurmukhi}</p>
        </span>
        <span>Translation:
          <p className="translation">{translationText}</p>
        </span>
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
          <p className="translation gurbani-font">{verse.translation?.pu?.ss?.gurmukhi}</p>
          <p className='modal-label'>Suggest Edits (optional)</p>
          <DiffInput actualText={translationText} editedText={suggested} updateText={setSuggested} />
          <p className='modal-label'>What is wrong with translation?</p>
          <select name="category" value={selectedOption} onChange={(e) => setSelectedOption(parseInt(e.target.value, 10))}>
            <option value="0" disabled>{TEXTS.VERSE_REVIEW_OPTIONS[0]}</option>
            <option value="1">{TEXTS.VERSE_REVIEW_OPTIONS[1]}</option>
            <option value="2">{TEXTS.VERSE_REVIEW_OPTIONS[2]}</option>
            <option value="3">{TEXTS.VERSE_REVIEW_OPTIONS[3]}</option>
            <option value="4">{TEXTS.VERSE_REVIEW_OPTIONS[4]}</option>
          </select>
          {selectedOption !== 0 && (
            <textarea placeholder='Enter your feedback here' value={comment} onChange={(e) => {
              setComment(e.target.value);
            }} />
          )}
          <button className='btn btn-primary' onClick={addVerseDetails}>Submit</button>
        </Dialog>
      )}
    </div>
  );
};

export default VerseReview;
