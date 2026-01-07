/* globals API_URL */
import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { buildApiUrl } from '@sttm/banidb';

import PageLoader from '../../pages/PageLoader';
import { pageView } from '../../util/analytics';
import { toShabadURL } from '../../util';
import VerseReview from './VerseReview';
import ShabadRating from './ShabadRating';
import { TEXTS } from '@/constants';
import { CalloutIcon } from './calloutIcon';

const Spinner = () => <div className="spinner" />;

interface MatchParams {
  shabadId: string;
}

interface ShabadReviewProps extends RouteComponentProps<MatchParams> {}

const ShabadReview: React.FC<ShabadReviewProps> = ({ match }) => {
  const { shabadId } = match.params;

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
                  <VerseReview key={'verse'+verse.verseId} verse={verse}/>
                ))}
              </div>
              <div className='shabad-review'>
                <h3 className='review-heading'>Feedback on translations for whole shabad</h3>
                <ShabadRating />
                <h5 className='feedback-question'>{TEXTS.SHABAD_RATING.FEEDBACK}</h5>
                <textarea onInput={resizeTextarea}className='feedback-textarea' placeholder='Enter your feedback here' />
                <button className='btn btn-primary'><CalloutIcon width={24} /><span>Submit Feedback</span></button>
              </div>
            </div>
          )
        }
      </PageLoader>
    </div>
  );
};

export default ShabadReview;
