import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { changeAngInView } from '../utils/change-ang-in-view';

interface IObserversMap {
  [key: number]: IntersectionObserver | typeof undefined;
}

const observersMap: IObserversMap = {};

export const useObserveLastPanktis = (source: string, angData: any) => {
  const history = useHistory();
  const handleChangeAngInView = useCallback(changeAngInView(history, source), [history, source]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const lastPanktis = Array.from(document.querySelectorAll('[data-last-paragraph="true"]'));
      const lastPankti = lastPanktis[lastPanktis.length - 1];
      const lastPanktiAngValue = Number(lastPankti.getAttribute('data-ang'));

      if (!observersMap[lastPanktiAngValue]) {
        const lastPanktiObserver = new IntersectionObserver(handleChangeAngInView, {
          rootMargin: '0px',
          threshold: [0, 1],
        });
        lastPanktiObserver.observe(lastPankti);
        observersMap[lastPanktiAngValue] = lastPanktiObserver;
      }
    }, 0);

    return () => clearTimeout(timeoutId);

  }, [angData])


  useEffect(() => {
    // Clear the observers
    return () => {
      Object.values(observersMap).forEach(observer => {
        if (observer) {
          observer.disconnect();
        }
      })

      Object.keys(observersMap).forEach((angStr: string) => {
        const ang = Number(angStr);
        observersMap[ang] = undefined;
      })
    }
  }, [])

}