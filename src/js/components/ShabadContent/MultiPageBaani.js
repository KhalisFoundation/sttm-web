import React from 'react';
import { useHistory } from 'react-router-dom';
import { toAngURL } from '../../util';
import Baani from '../Baani';
export const MultiPageBaani = React.memo((props) => {
  const { pages, ...baniProps } = props;
  const history = useHistory();

  return (
    <React.Fragment>
      {pages.map(({ page: gurbani, source }) => {
        return (
          <div key={source.pageNo}>
            <Baani
              source={source.sourceId}
              ang={source.pageNo}
              gurbani={gurbani}
              history={history}
              isParagraphMode={false}
              onBaaniLineClick={(highlightVerseId) => () => {
                const newUrl = toAngURL({
                  ang: source.pageNo,
                  source: source.sourceId,
                  highlight: highlightVerseId,
                });

                history.push(newUrl);
              }}
              {...baniProps}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
});
