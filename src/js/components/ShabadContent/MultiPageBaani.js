import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toAngURL } from '../../util';
import Baani from '../Baani';

export const MultiPageBaani = React.memo((props) => {
  const { pages, isReadingMode,...baaniProps } = props;
  const navigate = useNavigate();
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
              navigate={navigate}
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

                navigate(newUrl);
              }}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
});
