import React, { useMemo } from 'react';

const AutoDetectGurmukhiToggle = ({ isActive, onToggle }) => {
  const memoizedComponent = useMemo(() => {
    return (
      <button
        type="button"
        className={`auto-detect-gurmukhi-toggle ${isActive ? 'active' : ''}`}
        onClick={onToggle}
        aria-label={`${
          isActive ? 'Disable' : 'Enable'
        } Gurmukhi mode for auto detect`}
        title={`${isActive ? 'Switch to English' : 'Switch to Gurmukhi'} mode`}
      >
        <span className="toggle-text">{isActive ? 'ਗੁਰਮੁਖੀ' : 'English'}</span>
      </button>
    );
  }, [isActive, onToggle]);
  return memoizedComponent;
};

export default AutoDetectGurmukhiToggle;
