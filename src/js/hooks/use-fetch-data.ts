import { useEffect, useState} from 'react';

export const useFetchData = (url: string, cb?: () => {}) => {
  const [isFetchingData, setFetchingData] = useState<boolean>(false);
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

      setFetchingData(false);

      const data = await response.json();
      setData(data);


      // callback
      cb && cb();

    }

    if (url) {
      fetchData(url);
    }

  }, [url]);

  return {
    errorFetchingData,
    isFetchingData,
    data,
  }
}