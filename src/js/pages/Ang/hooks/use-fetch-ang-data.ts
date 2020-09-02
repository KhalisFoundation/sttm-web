import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux'
import { buildApiUrl, SOURCES } from '@sttm/banidb';
import { SET_LOADING_ANG } from '../../../features/actions';
import cache from '../cache-angs-data';

interface IUseFetchAngData {
  ang: number
  source: keyof typeof SOURCES
  setPrefetchAng: React.Dispatch<React.SetStateAction<number>>
}

export const useFetchAngData = ({ ang, source, setPrefetchAng }: IUseFetchAngData) => {
  const dispatch = useDispatch();
  const [errorFetchingAngData, setErrorFetchingAngData] = useState<string>('');
  const [angsDataMap, setAngsDataMap] = useState<any>({});
  const url = useMemo(() => buildApiUrl({ ang: ang, source, API_URL }), [ang, source, API_URL]);

  useEffect(() => {
    const fetchAngData = async (url: string) => {

      // Setting global state for ang loading
      dispatch({ type: SET_LOADING_ANG, payload: true });

      // Api Request and Response
      const response = await fetch(url);
      if (response.status !== 200) {
        setErrorFetchingAngData("Error fetching ang");
      }
      const angData = await response.json();
      // Setting cache and state

      cache.angsDataMap[ang] = angData;
      setAngsDataMap(cache.angsDataMap);
      setPrefetchAng(-1);

      // Dispatch for handling global state for ang
      setTimeout(() => {
        dispatch({ type: SET_LOADING_ANG, payload: false });
      }, 0) // kind of hack to make sure our DOM gets populated with data by now.
    }

    fetchAngData(url);

  }, [url]);

  return {
    errorFetchingAngData,
    angsDataMap
  }
}