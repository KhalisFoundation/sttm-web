import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toAngURL } from '../../util';
import Baani from '../Baani';
export const MultiPageBaani = React.memo((props) => {
  const { pages, isReadingMode,...baaniProps } = props;
  const history = useHistory();
  const sehajPaathMode = useSelector(state => state.sehajPaathMode);

  return (
    <React.Fragment>
      {pages.map(({ page: gurbani, source }) => {
        return (
          <div key={source.pageNo}>
            <Baani
              {...baaniProps}
              source={source.sourceId}
              ang={source.pageNo}
              gurbani={gurbani}
              history={history}
              isParagraphMode={false}
              isSehajPaathMode={sehajPaathMode}
              isSundarGutkaRoute={false}
              isReadingMode={isReadingMode}
              // offsetY={isLastPage ? lastScrollPosition : -1}
              onBaaniLineClick={(highlightVerseId) => () => {
                const newUrl = toAngURL({
                  ang: source.pageNo,
                  source: source.sourceId,
                  highlight: highlightVerseId,
                });

                history.push(newUrl);
              }}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
});
