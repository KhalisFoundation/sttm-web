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
import { showToast } from '@/util';

const Spinner = () => <div className="spinner" />;

interface MatchParams {
  shabadId: string;
}

interface ShabadReviewProps extends RouteComponentProps<MatchParams> {}

const ShabadReview: React.FC<ShabadReviewProps> = ({ match }) => {
  const { shabadId } = match.params;
  const shabadFeedbackRef = useRef<HTMLTextAreaElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    rating: {
      accuracy: 0,
      readability: 0,
      tone: 0,
      appropriateness: 0,
    },
    overallFeedback: '',
    verses: [],
    userId: 0, // TOOD: Update with actual user id
    shabadId: parseInt(shabadId, 10),
  });

  const addVerseFeedback = (feedbackObj: VerseFeedback) => {
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
    const hasMissingRating = Object.values(feedbackData.rating).some(value => value === 0);
    if (hasMissingRating) {
      showToast(TEXTS.SHABAD_RATING.MISSING_RATING_ERROR);
      return;
    }
    const comment = shabadFeedbackRef.current?.value;
    if (comment) {
      setFeedbackData((prev) => {
        const updated = {
          ...prev,
          overallFeedback: comment,
        };
        return updated;
      });
    } else {
      console.log('feedback data', feedbackData);
    }
    setSubmitted(true);
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
                <h3 className="review-heading">Review each verse</h3>
                {data.verses.map((verse: any) => (
                  <VerseReview
                    key={'verse' + verse.verseId}
                    verse={verse}
                    updateFeedback={addVerseFeedback}
                    currentFeedback={
                      feedbackData.verses.find(
                        (feedback) => feedback.verseId === verse.verseId
                      ) || null
                    }
                  />
                ))}
              </div>
              <div className="shabad-review">
                {submitted ? (
                  <>
                    <h3>Thank you</h3>
                    <p>
                      Your feedback has been submitted and will help others
                      understand the gurbani better.
                    </p>
                    <button className="btn btn-primary">
                      <CalloutIcon width={24} />
                      <span>Review another</span>
                    </button>
                    <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>Edit review</button>
                  </>
                ) : (
                  <>
                    <h3 className="review-heading">
                      Feedback on translations for whole shabad
                    </h3>
                    <ShabadRating updateRating={addStarRating} currentRating={feedbackData.rating}/>
                    <h5 className="feedback-question">
                      {TEXTS.SHABAD_RATING.FEEDBACK}
                    </h5>
                    <textarea
                      name="shabadFeedback"
                      ref={shabadFeedbackRef}
                      onInput={resizeTextarea}
                      className="feedback-textarea"
                      placeholder="Enter your feedback here"
                    />
                    <button
                      className="btn btn-primary"
                      onClick={submitFeedback}
                    >
                      <CalloutIcon width={24} />
                      <span>Submit Feedback</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        }
      </PageLoader>
    </div>
  );
};

export default ShabadReview;
