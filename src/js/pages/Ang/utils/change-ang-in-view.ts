import { History } from 'history';
import { toAngURL } from '@/util';

export const changeAngInView = (history: History, source: string) => (observedPanktis: IntersectionObserverEntry[]) => {
  observedPanktis.forEach(observedPankti => {
    const { target: targetPankti } = observedPankti;

    const observedPanktiOffsetY = window.scrollY + observedPankti.boundingClientRect.y;

    // It's y position for window bottom => windowTop + currenViewPortHeight.
    const windowBottomOffsetY = window.scrollY + window.innerHeight;

    const isScrolledUpObservedPankti = windowBottomOffsetY > observedPanktiOffsetY;
    const isScrolledDownObservedPankti = windowBottomOffsetY <= observedPanktiOffsetY;

    const observedAng = Number(targetPankti.getAttribute('data-ang'));

    if (isScrolledUpObservedPankti) {
      if (observedPankti.isIntersecting &&
        observedPankti.intersectionRatio === 1) {
        const newUrl = toAngURL({ ang: observedAng + 1, source, highlight: undefined });

        // We are on currently loaded ang, so we need to load new ang
        history.push(newUrl);
      }
    }

    if (isScrolledDownObservedPankti) {
      if (!observedPankti.isIntersecting &&
        observedPankti.intersectionRatio === 0) {
        const newUrl = toAngURL({ ang: observedAng, source, highlight: undefined });

        // We are on currently are on observed ang, so load that
        history.push(newUrl);
      }
    }
  })
}