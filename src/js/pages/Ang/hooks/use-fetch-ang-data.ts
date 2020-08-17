import { useEffect, useState } from 'react';
import cache from '../cache-angs-data';

export const useFetchAngData = (ang: number, url: string) => {
  const [isFetchingAngData, setFetchingAngData] = useState<boolean>(false);
  const [errorFetchingAngData, setErrorFetchingAngData] = useState<string>('');
  const [angsDataMap, setangsDataMap] = useState<any>([]);

  useEffect(() => {
    const fetchAngData = async (url: string) => {
      setFetchingAngData(true);

      const response = await fetch(url)

      if (response.status !== 200) {
        setErrorFetchingAngData("Error fetching ang");
      }
      const angData = await response.json();
      cache.angsDataMap[ang] = angData;
      setangsDataMap(cache.angsDataMap);

      setFetchingAngData(false);
    }

    fetchAngData(url);

  }, [url]);

  return {
    isFetchingAngData,
    errorFetchingAngData,
    angsDataMap
  }
}