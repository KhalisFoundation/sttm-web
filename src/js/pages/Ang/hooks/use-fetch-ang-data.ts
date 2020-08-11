import { useEffect, useState } from 'react';
import cache from '../cache-angs-data';

export const useFetchAngData = (url: string) => {
  const [isFetchingAngData, setFetchingAngData] = useState<boolean>(false);
  const [errorFetchingAngData, setErrorFetchingAngData] = useState<string>('');
  const [angsDataMap, setangsDataMap] = useState<any>([]);

  useEffect(() => {
    const fetchAngData = async (url: string) => {
      setFetchingAngData(true);
      const response = await fetch(url)
      console.log(response, '>>>>>>')
      if (response.status !== 200) {
        console.log(response, "RESPONSE")
        setErrorFetchingAngData("Error fetching ang");
      }
      const angData = await response.json();
      console.log(angData, '.... angdata..')
      cache.angsDataMap[url] = angData;
      console.log(cache.angsDataMap, ".... cache data")
      setangsDataMap(cache.angsDataMap);
      setFetchingAngData(false);
    }

    console.log('USE EFFECT NOT RUNNING');

    fetchAngData(url);

  }, [url]);

  return {
    isFetchingAngData,
    errorFetchingAngData,
    angsDataMap
  }
}