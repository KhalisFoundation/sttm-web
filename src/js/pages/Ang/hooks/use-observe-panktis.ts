import { useEffect, useCallback } from 'react';

import { History } from 'history';
import { changeAngInView } from '../utils/change-ang-in-view';
import { prefetchNextAng } from '../utils/prefetch-next-ang';

interface IUseObservePanktis {
  history: History
  source: string
  isSehajPaathMode: boolean
  setPrefetchAng: React.Dispatch<React.SetStateAction<number>>
}

interface IObserversMap {
  [key: number]: IntersectionObserver | typeof undefined;
}

const lastPanktisObserversMap: IObserversMap = {};
const firstPanktisObserversMap: IObserversMap = {};

const clearObservers = (observersMap: IObserversMap) => {
  Object.entries(observersMap).forEach(([angStr, observer]) => {
    if (observer) {
      observer.disconnect();
    }
    const ang = Number(angStr);
    observersMap[ang] = undefined;
  })
}

export const useObservePanktis = ({ source, history, setPrefetchAng, isSehajPaathMode }: IUseObservePanktis) => {

  const handleChangeAngInView = useCallback(changeAngInView(history, source), [history, source]);
  const handlePrefetchNextAng = useCallback(prefetchNextAng(setPrefetchAng), [setPrefetchAng]);

  useEffect(() => {
    if (isSehajPaathMode) {
      const firstPanktis = Array.from(document.querySelectorAll('[data-first-paragraph="true"]'));
      const lastPanktis = Array.from(document.querySelectorAll('[data-last-paragraph="true"]'));
      const firstPankti = firstPanktis[firstPanktis.length - 1];
      const lastPankti = lastPanktis[lastPanktis.length - 1];
      if (lastPankti) {
        const angValue = Number(lastPankti.getAttribute('data-ang'));

        if (!lastPanktisObserversMap[angValue]) {
          const lastPanktiObserver = new IntersectionObserver(handleChangeAngInView, {
            threshold: [1],
          });
          lastPanktiObserver.observe(lastPankti);
          lastPanktisObserversMap[angValue] = lastPanktiObserver;
        }

        if (!firstPanktisObserversMap[angValue]) {
          const firstPanktiObserver = new IntersectionObserver(handlePrefetchNextAng, {
            threshold: [1]
          });
          firstPanktiObserver.observe(firstPankti);
          firstPanktisObserversMap[angValue] = firstPanktiObserver;
        }
      }
    }
  });


  useEffect(() => {
    // Clear the observers
    return () => {
      clearObservers(lastPanktisObserversMap);
      clearObservers(firstPanktisObserversMap);
    }
  }, [])

}