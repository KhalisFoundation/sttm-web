import React from 'react';
import PropTypes from 'prop-types';

const PreviewShabad = (props) => {
  const { verses } = props;
  const displayVerseCount = 12;
  const totalVerseCount = verses?.length;
  return (
    <div className="preview-shabad-background">
      <div className="preview-shabad-container">
        <div className="preview-shabad-title">PREVIEW</div>
        {verses.length ? (
          <div className="preview-shabad-body">
            <div className="shabad-verses gurbani-font">
              {verses.slice(0, displayVerseCount).map((item) => (
                <div key={item.verseId}>{item.verse.gurmukhi}</div>
              ))}
            </div>
          </div>
        ) : (
          <span className="preview-shabad-loading">Loading...</span>
        )}
        {totalVerseCount - displayVerseCount > 0 && (
          <div className="preview-shabad-footer">
            + {totalVerseCount - displayVerseCount} more lines...
          </div>
        )}
      </div>
    </div>
  );
};

PreviewShabad.propTypes = {
  verses: PropTypes.array,
};

export default PreviewShabad;
