import { History } from 'history';
import { toAngURL } from '@/util';

export const changeAngInView =
  (history: History, source: string) =>
    (observedPanktis: IntersectionObserverEntry[]) => {

      observedPanktis.forEach(observedPankti => {
        const { target: targetPankti } = observedPankti;
        console.log(target, "HANDLE CHANGE ANG IN VIEW")
        const observedPanktiOffsetY = targetPankti.getBoundingClientRect().y;
        const isObservedPanktiCrossedBy = observedPanktiOffsetY <= 0; // -ve Y value appears only when window.scrollY cross it
        const isObservedPanktiAppears = observedPanktiOffsetY > 0; // +ve Y value appears when window.scrollY yet have some distance to cross it
        const observedAng = Number(targetPankti.getAttribute('data-ang'));
        const qParams = new URLSearchParams(window.location.search);
        const currentAng = Number(qParams.get('ang'))
        let newUrl = '';
        if (isObservedPanktiCrossedBy) {
          if (observedAng + 1 !== currentAng) {
            newUrl = toAngURL({ ang: observedAng + 1, source, highlight: undefined });

            history.push(newUrl);
          }
        }

        if (observedPankti.isIntersecting) {
          if (observedPankti.intersectionRatio > 0) {
            if (isObservedPanktiAppears) {
              if (observedAng !== currentAng) {
                newUrl = toAngURL({ ang: observedAng, source, highlight: undefined });

                // We are on currently loaded ang, so we need to load new ang
                history.push(newUrl);
              }
            }
          }
        }
      })
    }
