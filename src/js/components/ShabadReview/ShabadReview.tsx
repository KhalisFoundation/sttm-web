/* globals API_URL, SP_API */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { buildApiUrl } from '@sttm/banidb';

import PageLoader from '../../pages/PageLoader';
import { pageView } from '../../util/analytics';
import { toShabadURL } from '../../util';
import VerseReview from './VerseReview';
import ShabadRating from './ShabadRating';
import { TEXTS, LOCAL_STORAGE_KEY_FOR_PENDING_SHABAD_REVIEW } from '@/constants';
import { FeedbackData, VerseFeedback, RatingType } from '@/types/shabad-review';
import { CalloutIcon } from '../Icons/calloutIcon';
import { showToast } from '@/util';
import { useGetUser } from '@/hooks';
import { IUser } from '@/types/user';

const Spinner = () => <div className="spinner" />;

interface MatchParams {
  shabadId: string;
}

interface ShabadReviewProps extends RouteComponentProps<MatchParams> {}

const ShabadReview: React.FC<ShabadReviewProps> = ({ match }) => {
  const { shabadId } = match.params;
  const shabadFeedbackRef = useRef<HTMLTextAreaElement | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useGetUser<IUser>();

  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    rating: {
      accuracy: 0,
      readability: 0,
      tone: 0,
      appropriateness: 0,
    },
    overallFeedback: '',
    verses: [],
    email: '', // TOOD: Update with actual user id
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

  const postFeedback = async (data: FeedbackData) => {
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(res => res.json());
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const submitFeedback = async () => {
    const comment = shabadFeedbackRef.current?.value || '';
    const dataToSubmit = {
      ...feedbackData,
      overallFeedback: comment,
    };

    const hasMissingRating = Object.values(dataToSubmit.rating).some(value => value === 0);
    if (hasMissingRating) {
      showToast(TEXTS.SHABAD_RATING.MISSING_RATING_ERROR);
      return;
    }

    if (!user) {
      localStorage.setItem(LOCAL_STORAGE_KEY_FOR_PENDING_SHABAD_REVIEW, JSON.stringify(dataToSubmit));
      window.location.href = `${SP_API}/login/sso?redirect_url=${encodeURIComponent(window.location.href)}`;
      return;
    }
    
    setFeedbackData(dataToSubmit);
    postFeedback(dataToSubmit);
  };

  useEffect(() => {
    if (user && user.email) {
      const fetchUserFeedback = async () => {
        try {
          const response = await fetch(`/api/feedback/${shabadId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email }),
          });
          const data = await response.json();
          setFeedbackData(data.feedback);
        } catch (error) {
          console.error('Error fetching feedback:', error);
        }
      };
      fetchUserFeedback();
      setFeedbackData((prev) => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user, shabadId]);

  useEffect(() => {
    if (user) {
      const pendingDataStr = localStorage.getItem(LOCAL_STORAGE_KEY_FOR_PENDING_SHABAD_REVIEW);
      if (pendingDataStr) {
        try {
          const pendingData: FeedbackData = JSON.parse(pendingDataStr);
          if (pendingData.shabadId === parseInt(shabadId, 10)) {
            setFeedbackData(pendingData);
            postFeedback(pendingData);
            localStorage.removeItem(LOCAL_STORAGE_KEY_FOR_PENDING_SHABAD_REVIEW);
            if (shabadFeedbackRef.current) {
              shabadFeedbackRef.current.value = pendingData.overallFeedback;
            }
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Error parsing pending feedback:', e);
          localStorage.removeItem(LOCAL_STORAGE_KEY_FOR_PENDING_SHABAD_REVIEW);
        }
      }
    }
  }, [user, shabadId]);

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

  const setTextAreaRef = useCallback((node) => {
    shabadFeedbackRef.current = node;
    if (node && feedbackData.overallFeedback) {
      if (node.value !== feedbackData.overallFeedback) {
        node.value = feedbackData.overallFeedback;
        node.style.height = 'auto';
        node.style.height = node.scrollHeight + 'px';
      }
    }
  }, [feedbackData.overallFeedback]);

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
                      ref={setTextAreaRef}
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
