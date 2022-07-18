import React from 'react';
import PropTypes from 'prop-types';

const PreviewShabad = (props) => {
  const { verses } = props;
  const displayVerseCount = 12;
  const totalVerseCount = verses?.length;
  const versesNotPreviewedCount = totalVerseCount - displayVerseCount; 
  return (
    <div className="preview-shabad-background">
      <div className="preview-shabad-container">
        <h3 className="preview-shabad-title">PREVIEW</h3>
        {verses.length ? (
          <div className="preview-shabad-body">
            <div className="shabad-verses gurbani-font">
              {verses.slice(0, displayVerseCount).map((item) => (
                <p key={item.verseId}>{item.verse.gurmukhi}</p>
              ))}
            </div>
          </div>
        ) : (
          <span className="preview-shabad-loading">Loading...</span>
        )}
        {versesNotPreviewedCount > 0 && (
          <div className="preview-shabad-footer">
            {versesNotPreviewedCount === 1
              ? `+ ${versesNotPreviewedCount} more line...`
              : `+ ${versesNotPreviewedCount} more lines...`}
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
