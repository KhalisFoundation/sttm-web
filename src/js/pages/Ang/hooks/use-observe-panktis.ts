import { useEffect, useCallback } from 'react';
import { History } from 'history';
import { changeAngInView } from '../utils/change-ang-in-view';
import { prefetchNextAng } from '../utils/prefetch-next-ang';

interface IUseObservePanktis {
  history: History
  source: string
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
  });
}

export const useObservePanktis = ({ source, history, setPrefetchAng }: IUseObservePanktis) => {
  const handleChangeAngInView = useCallback(changeAngInView(history, source), [history, source]);
  const handlePrefetchNextAng = useCallback(prefetchNextAng(setPrefetchAng), [setPrefetchAng]);

  useEffect(() => {
    const firstPanktis = Array.from(document.querySelectorAll('[data-first-paragraph="true"]'));
    const lastPanktis = Array.from(document.querySelectorAll('[data-last-paragraph="true"]'));
    // const firstPankti = firstPanktis[firstPanktis.length - 1];
    // const lastPankti = lastPanktis[lastPanktis.length - 1];
    console.log(lastPanktis, 'lastPankti')
    if (lastPanktis) {

      lastPanktis.forEach(lastPankti => {
        const angValue = Number(lastPankti.getAttribute('data-ang'));
        const lastPanktiObserver = new IntersectionObserver(handleChangeAngInView, {
          threshold: [1],
        });
        lastPanktiObserver.observe(lastPankti);
        if (lastPanktisObserversMap[angValue]) {
          lastPanktisObserversMap[angValue].disconnect();
        }
        lastPanktisObserversMap[angValue] = lastPanktiObserver;
      })
      // if (!lastPanktisObserversMap[angValue]) {
      // const lastPanktiObserver = new IntersectionObserver(handleChangeAngInView, {
      //   threshold: [1],
      // });
      // lastPanktiObserver.observe(lastPankti);
      // lastPanktisObserversMap[angValue] = lastPanktiObserver;
      // }

      firstPanktis.forEach(firstPankti => {
        const angValue = Number(firstPankti.getAttribute('data-ang'));
        const firstPanktiObserver = new IntersectionObserver(handlePrefetchNextAng, {
          threshold: [1]
        });
        firstPanktiObserver.observe(firstPankti);
        if (firstPanktisObserversMap[angValue]) {
          firstPanktisObserversMap[angValue].disconnect();
        }
        firstPanktisObserversMap[angValue] = firstPanktiObserver;
      })

      // if (!firstPanktisObserversMap[angValue]) {
      // const firstPanktiObserver = new IntersectionObserver(handlePrefetchNextAng, {
      //   threshold: [1]
      // });
      // firstPanktiObserver.observe(firstPankti);
      // firstPanktisObserversMap[angValue] = firstPanktiObserver;
      // }
    }

    // return () => clearTimeout(timeoutId);

  });


  useEffect(() => {
    // Clear the observers
    return () => {
      clearObservers(lastPanktisObserversMap);
      clearObservers(firstPanktisObserversMap);
    }
  }, [])

}