import React from 'react';
import { toAngURL } from '../../util';
import Baani from '../Baani';
export const MultiPageBaani = React.memo(({
  history,
  pages,
  type,
  splitView,
  unicode,
  highlight,
  larivaar,
  fontSize,
  translationFontSize,
  transliterationFontSize,
  lineHeight,
  fontFamily,
  larivaarAssist,
  translationLanguage,
  centerAlignGurbani,
  showFullScreen,
  transliterationLanguages,
  translationLanguages,
}) => {

  return (
    <React.Fragment>
      {pages.map(({ page: gurbani, source }, idx) => {
        return (
          <Baani
            key={idx}
            source={source.sourceId}
            ang={source.pageNo}
            type={type}
            gurbani={gurbani}
            splitView={splitView}
            unicode={unicode}
            history={history}
            // offsetY={isLastPage ? lastScrollPosition : -1}
            onBaaniLineClick={(highlightVerseId) => () => {
              const newUrl = toAngURL({
                ang: source.pageNo,
                source: source.sourceId,
                highlight: highlightVerseId,
              });

              history.push(newUrl);
            }}
            highlight={highlight}
            larivaar={larivaar}
            fontSize={fontSize}
            translationFontSize={translationFontSize}
            transliterationFontSize={transliterationFontSize}
            lineHeight={lineHeight}
            fontFamily={fontFamily}
            larivaarAssist={larivaarAssist}
            translationLanguages={translationLanguages}
            transliterationLanguages={transliterationLanguages}
            centerAlignGurbani={centerAlignGurbani}
            showFullScreen={showFullScreen}
            isParagraphMode={false}
          />
        );
      })}
    </React.Fragment>
  );
});
