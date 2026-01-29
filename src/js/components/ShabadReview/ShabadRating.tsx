import React from 'react';
import { TEXTS } from '@/constants';
import { StarsRating } from '../StarsRating';
import { RatingType } from '@/types/shabad-review';

const { SHABAD_RATING } = TEXTS;

const ratingOptions = [
  {
    label: SHABAD_RATING.ACCURACY,
    value: 'accuracy',
  },
  {
    label: SHABAD_RATING.READABILITY,
    value: 'readability',
  },
  {
    label: SHABAD_RATING.TONE,
    value: 'tone',
  },
  {
    label: SHABAD_RATING.APPROPRIATENESS,
    value: 'appropriateness',
  },
];

const ShabadRating = ({
  updateRating,
  currentRating,
}: {
  updateRating: (rating: number, type: RatingType) => void;
  currentRating: {
    accuracy: number;
    readability: number;
    tone: number;
    appropriateness: number;
  };
}) => {
  return (
    <div className="shabad-rating">
      {ratingOptions.map((option) => (
        <div className="rating-item" key={option.value}>
          <p>{option.label}: </p>
          <StarsRating
            count={5}
            updateRating={updateRating}
            type={option.value as RatingType}
            currentRating={currentRating[option.value as RatingType]}
          />
        </div>
      ))}
    </div>
  );
};

export default ShabadRating;
