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
  const [isFetchingAngData, setFetchingAngData] = useState<boolean>(false);
  const [errorFetchingAngData, setErrorFetchingAngData] = useState<string>('');
  const [angsDataMap, setangsDataMap] = useState<any>([]);
  const dispatch = useDispatch();
  const url = useMemo(() => buildApiUrl({ ang: ang, source, API_URL }), [ang, source, API_URL]);

  useEffect(() => {
    const fetchAngData = async (url: string) => {
      setFetchingAngData(true);
      dispatch({ type: SET_LOADING_ANG, payload: true });
      const response = await fetch(url);

      if (response.status !== 200) {
        setErrorFetchingAngData("Error fetching ang");
      }
      const angData = await response.json();
      cache.angsDataMap[ang] = angData;
      setangsDataMap(cache.angsDataMap);
      setFetchingAngData(false);
      setPrefetchAng(-1);

      setTimeout(() => {
        dispatch({ type: SET_LOADING_ANG, payload: false });
      }, 1000) // kind of hack to make sure our DOM gets populated with data by now.
    }

    fetchAngData(url);

  }, [url]);

  return {
    isFetchingAngData,
    errorFetchingAngData,
    angsDataMap
  }
}