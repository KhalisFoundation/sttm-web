import store from '@/features/store';
import { SET_PREFETCH_ANG } from '@/features/actions';

export const prefetchAng =
  (ang: number) =>
    (inView: boolean, observedPankti: IntersectionObserverEntry) => {
      if (inView) {
        if (observedPankti.intersectionRatio > 0) {
          const angToPrefetch = Number(observedPankti.target.getAttribute('data-ang'));
          if (angToPrefetch) {
            store.dispatch({ type: SET_PREFETCH_ANG, payload: angToPrefetch + 1 });
          }
        }
      }
    }
