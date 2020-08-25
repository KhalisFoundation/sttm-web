import { useEffect } from 'react';

export const useKeydownEventHandler = (eventListener: EventListener) => {
  useEffect(() => {
    document.addEventListener('keydown', eventListener);

    return () => document.removeEventListener('keydown', eventListener);
  }, [eventListener])
}