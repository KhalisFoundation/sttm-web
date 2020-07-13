import { useState, useEffect } from 'react';

export const useFetchSearchLists =
  ({ isShowSearchByRaags, isShowSearchByWriters }: {
    isShowSearchByRaags: boolean,
    isShowSearchByWriters: boolean,
  }) => {
    const [isFetching, setIsFetching] = useState<Boolean>(false);
    const [raags, setRaags] = useState<{ id: string }[]>([]);
    const [writers, setWriters] = useState<{ id: string }[]>([]);

    useEffect(() => {
      setIsFetching(true);

      const fetchListAsync = async (apiUrl: string, type: string) => {
        const response = await fetch(apiUrl);
        if (response.status !== 200) {
          throw new Error('There was some error fetching data');
        }

        if (type === 'raag') {
          const raags = await response.json();
          const searchRaags = raags.map(
            ({ raagID: id, RaagUnicode: unicode, RaagEnglish: en }) => {
              const searchRaag = {
                [id]: id === 0 ? 'all' : en,
              }
              return searchRaag;
            }

          );
          setRaags(searchRaags);
          return;
        }

        const writers = await response.json();
        const searchWriters = writers.map(
          ({ WriterID: id, WriterUnicode: unicode, WriterEnglish: en }) => {
            const searchWriter = {
              [id]: id === 0 ? 'all' : en,
            }
            return searchWriter;
          }
        )
        setWriters(searchWriters);
      }

      if (isShowSearchByRaags) {
        fetchListAsync(`${API_URL}/raags`, 'raag');
      }
      if (isShowSearchByWriters) {
        fetchListAsync(`${API_URL}/writers`, 'writer');
      }

      setIsFetching(false);
    }, []);

    return {
      isFetching,
      raags,
      writers
    }
  }
