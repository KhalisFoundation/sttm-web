import { History } from 'history';
import { toAngURL } from '@/util';
interface IChangeAngArgs {
  history: History
  source: string
  ang: number
}

export const changeAng =
  ({ history, source, ang }: IChangeAngArgs) =>
    (inView: boolean, observedPankti: IntersectionObserverEntry) => {

      const qParams = new URLSearchParams(window.location.search);
      const currentAng = Number(qParams.get('ang'));

      const observedPanktiOffsetY = observedPankti.boundingClientRect.y;
      const isObservedPanktiCrossedBy = observedPanktiOffsetY <= 0; // -ve Y value appears only when window.scrollY cross it
      const isObservedPanktiAppears = observedPanktiOffsetY > 0; // +ve Y value appears when window.scrollY yet have some distance to cross it
      // const observedAng = Number(targetPankti.getAttribute('data-ang'));
      if (isObservedPanktiCrossedBy) {
        if (ang + 1 != currentAng) {
          const newUrl = toAngURL({ ang: ang + 1, source, highlight: undefined });

          history.push(newUrl);
        }
      }

      if (observedPankti.isIntersecting) {
        if (observedPankti.intersectionRatio > 0) {
          if (isObservedPanktiAppears) {
            if (ang != currentAng) {
              const newUrl = toAngURL({ ang: ang, source, highlight: undefined });
              // We are on currently loaded ang, so we need to load new ang
              history.push(newUrl);
            }
          }
        }
      }
    }
