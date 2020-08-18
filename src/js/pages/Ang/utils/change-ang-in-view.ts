import { History } from 'history';
import { toAngURL } from '@/util';

export const changeAngInView =
  (history: History, source: string) =>
    (observedPanktis: IntersectionObserverEntry[]) => {

      observedPanktis.forEach(observedPankti => {
        const { target: targetPankti } = observedPankti;

        const observedPanktiOffsetY = observedPankti.boundingClientRect.y;

        const isObservedPanktiCrossedBy = window.scrollY >= window.scrollY + observedPanktiOffsetY;
        const isObservedPanktiAppears = window.scrollY < window.scrollY + observedPanktiOffsetY;

        const observedAng = Number(targetPankti.getAttribute('data-ang'));


        if (observedPankti.isIntersecting && observedPankti.intersectionRatio > 0) {
          let newUrl = '';
          if (isObservedPanktiCrossedBy) {
            newUrl = toAngURL({ ang: observedAng + 1, source, highlight: undefined });
          }
          if (isObservedPanktiAppears) {
            newUrl = toAngURL({ ang: observedAng, source, highlight: undefined });
          }
          // We are on currently loaded ang, so we need to load new ang
          history.push(newUrl);
        }
      })
    }
