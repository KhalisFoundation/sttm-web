import React from 'react';

export const prefetchNextAng =
  (setPrefetchAng: React.Dispatch<React.SetStateAction<number>>) =>
    (observedPanktis: IntersectionObserverEntry[]) => {
      observedPanktis.forEach(observedPankti => {
        if (observedPankti.isIntersecting) {
          if (observedPankti.intersectionRatio > 0) {
            const { target: targetPankti } = observedPankti;
            const angValue = Number(targetPankti.getAttribute('data-ang'));

            setPrefetchAng(angValue + 1);
          }
        }
      })
    }