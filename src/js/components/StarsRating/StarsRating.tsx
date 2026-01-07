import React, { useState } from 'react';
import { StarIcon } from '../Icons/StarIcon';

const StarsRating = ({ count = 5 }: { count: number }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleStarClick = (index: number) => {
    setSelectedRating(index + 1);
  };

  const handleStarHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getClassName = (index: number): string => {
    const displayIndex = hoveredIndex !== null ? hoveredIndex : (selectedRating !== null ? selectedRating - 1 : -1);
    
    if (index > displayIndex) {
      return 'disabled';
    }
    
    const rating = hoveredIndex !== null ? hoveredIndex + 1 : (selectedRating !== null ? selectedRating : 0);
    const percentage = (rating / count) * 100;
    
    if (percentage <= 20) {
      return 'low';
    } else if (percentage <= 60) {
      return 'medium';
    } else {
      return 'high';
    }
  };

  return (
    <div className="stars-rating" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: count }, (_, index) => (
            <button 
                key={index} 
                className='star-button'
                onClick={() => handleStarClick(index)}
                onMouseEnter={() => handleStarHover(index)}
            >
                <StarIcon className={getClassName(index)} />
            </button>
        ))}
    </div>
  );
};

export default StarsRating;
