import { useEffect } from 'react';

type asyncCb = (key: boolean | null) => void

export const useEscapeKeyEventHandler = (cb: asyncCb) => {
  useEffect(() => {
     const onEscapeKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        cb(null);
      }
    }
    document.addEventListener('keydown', onEscapeKey);

    return () => document.removeEventListener('keydown', onEscapeKey);
  }, [cb])
}