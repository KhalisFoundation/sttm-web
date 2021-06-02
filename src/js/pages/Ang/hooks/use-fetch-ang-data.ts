import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import LRU from 'lru';
import { buildApiUrl, SOURCES } from '@sttm/banidb';
import { SET_LOADING_ANG, SET_PREFETCH_ANG } from '@/features/actions';
import cacheAngsData from '../cache-angs-data';

interface IUseFetchAngData {
  ang: number
  source: keyof typeof SOURCES
  isSehajPaathMode: boolean
}

const _getFetchedAngs = (cacheAngsData: typeof LRU, currentAng: number) => {
  return {
    [currentAng - 1]: cacheAngsData.get(currentAng - 1),
    [currentAng]: cacheAngsData.get(currentAng),
    [currentAng + 1]: cacheAngsData.get(currentAng + 1)
  }
}

export const useFetchAngData = ({ ang, source, isSehajPaathMode }: IUseFetchAngData) => {
  const dispatch = useDispatch();
  const { prefetchAng } = useSelector(store => store);
  const [errorFetchingAngData, setErrorFetchingAngData] = useState<string>('');
  const [angsDataMap, setAngsDataMap] = useState<any>({});
  const angToFetch = prefetchAng || ang;
  const url = useMemo(() => buildApiUrl({ ang: angToFetch, source, API_URL }), [angToFetch, source, API_URL]);

  useEffect(() => {
    const fetchAngData = async (url: string) => {

      // Setting global state for ang loading
      dispatch({ type: SET_LOADING_ANG, payload: true });

      if (!cacheAngsData.get(angToFetch)) {
        // Api Request and Response
        const response = await fetch(url);
        if (response.status !== 200) {
          setErrorFetchingAngData("Error fetching ang");
        }
        const angData = await response.json();
        cacheAngsData.set(angToFetch, angData);
      }

      setAngsDataMap(_getFetchedAngs(cacheAngsData, ang));

      if (prefetchAng) {
        dispatch({ type: SET_PREFETCH_ANG, payload: undefined });
      }

      // Dispatch for handling global state for ang
      setTimeout(() => {
        dispatch({ type: SET_LOADING_ANG, payload: false });
      }, 0) // kind of hack to make sure our DOM gets populated with data by now.
    }

    fetchAngData(url);

  }, [url]);

  useEffect(() => {
    if (!isSehajPaathMode) {
      //clear cache
      cacheAngsData.clear();
    }
  }, [isSehajPaathMode])

  return {
    errorFetchingAngData,
    angsDataMap
  }
}