import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux'
import { buildApiUrl, SOURCES } from '@sttm/banidb';

interface IUseFetchAngData {
  ang: number
  source: keyof typeof SOURCES
  isSehajPaathMode: boolean
  setPrefetchAng: React.Dispatch<React.SetStateAction<number>>
}

export const useFetchData = (url: string) => {
  const [isFetchingData, setFetchingData] = useState<boolean>('');
  const [errorFetchingData, setErrorFetchingData] = useState<string>('');
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async (url: string) => {

      setFetchingData(true);

      // Api Request and Response
      const response = await fetch(url);
      if (response.status !== 200) {
        setErrorFetchingData("error fetching data");
      }
      const data = await response.json();

      setFetchingData(false);
    }

    fetchData(url);

  }, [url]);

  return {
    errorFetchingData,
    isFetchingData,
    data,
  }
}