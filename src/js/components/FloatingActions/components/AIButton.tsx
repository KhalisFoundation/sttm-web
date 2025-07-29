import React from 'react';
import PropTypes from 'prop-types';
import AIIcon from '@/components/Icons/AIIcon';

interface Props {
  onClick: () => void;
  isActive?: boolean;
}

const AIButton: React.FC<Props> = ({ onClick, isActive = false }) => {
  return (
    <div
      role="button"
      aria-pressed={isActive}
      className={`fab ai-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <AIIcon />
    </div>
  );
};

AIButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default AIButton; 