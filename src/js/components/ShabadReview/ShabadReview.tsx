/* globals API_URL */
import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { buildApiUrl } from '@sttm/banidb';

import PageLoader from '../../pages/PageLoader';
import { pageView } from '../../util/analytics';
import { toShabadURL } from '../../util';
import VerseReview from './VerseReview';
import ShabadRating from './ShabadRating';
import { TEXTS } from '@/constants';
import { FeedbackData, VerseFeedback, RatingType } from '@/types/shabad-review';
import { CalloutIcon } from '../Icons/calloutIcon';


const Spinner = () => <div className="spinner" />;

interface MatchParams {
  shabadId: string;
}

interface ShabadReviewProps extends RouteComponentProps<MatchParams> {}

const ShabadReview: React.FC<ShabadReviewProps> = ({ match }) => {
  const { shabadId } = match.params;
  const shabadFeedbackRef = useRef<HTMLTextAreaElement>(null);

  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    rating: {
      accuracy: 0,
      readability: 0,
      tone: 0,
      appropriateness: 0,
    },
    overallFeedback: '',
    verses: [],
  });

  const addVerseFeedback = (feedbackObj: VerseFeedback) => {
    console.log('adding feedbackObj', feedbackObj, 'to feedbackData', feedbackData);
    setFeedbackData((prev) => {
      const existingIndex = prev.verses.findIndex(verse => verse.verseId === feedbackObj.verseId);
      let updatedVerses;
      
      if (existingIndex >= 0) {
        // Update existing verse feedback
        updatedVerses = prev.verses.map((verse, index) => 
          index === existingIndex ? feedbackObj : verse
        );
      } else {
        // Add new verse feedback
        updatedVerses = [...prev.verses, feedbackObj];
      }
      
      console.log('updated verses', updatedVerses);
      return {
        ...prev,
        verses: updatedVerses,
      };
    });
  };

  const addStarRating = (rating: number, type: RatingType) => {
    setFeedbackData((prev) => ({
      ...prev,
      rating: {
        ...prev.rating,
        [type]: rating,
      },
    }));
  };

  const submitFeedback = () => {
    const comment = shabadFeedbackRef.current?.value;
    if (comment) {
      setFeedbackData((prev) => {
        const updated = {
          ...prev,
          overallFeedback: comment,
        };
        console.log('feedback data', updated);
        return updated;
      });
    } else {
      console.log('feedback data', feedbackData);
    }
  };

  useEffect(() => {
    pageView(
      toShabadURL({
        shabad: {
          shabadId: shabadId,
          verseId: '',
        },
        q: '',
        type: 'shabad-review',
        source: '',
      })
    );
  }, [shabadId]);

  const url = buildApiUrl({
    random: false,
    id: parseInt(shabadId, 10),
    API_URL,
  });

  const resizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  return (
    <div className="row" id="content-root">
      <PageLoader url={url}>
        {({ data, loading }: { data: any; loading: boolean }) =>
          loading ? (
            <Spinner />
          ) : (
            <div className="review-container">
              <div className="verse-review-container">
                <h3 className='review-heading'>Review each verse</h3>
                {data.verses.map((verse: any) => (
                  <VerseReview key={'verse'+verse.verseId} verse={verse} updateFeedback={addVerseFeedback} />
                ))}
              </div>
              <div className='shabad-review'>
                <h3 className='review-heading'>Feedback on translations for whole shabad</h3>
                <ShabadRating updateRating={addStarRating}/>
                <h5 className='feedback-question'>{TEXTS.SHABAD_RATING.FEEDBACK}</h5>
                <textarea name='shabadFeedback' ref={shabadFeedbackRef} onInput={resizeTextarea} className='feedback-textarea' placeholder='Enter your feedback here' />
                <button className='btn btn-primary' onClick={submitFeedback}><CalloutIcon width={24} /><span>Submit Feedback</span></button>
              </div>
            </div>
          )
        }
      </PageLoader>
    </div>
  );
};

export default ShabadReview;
