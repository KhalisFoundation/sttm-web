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
      const fetchListAsync = async (apiUrl: string, type?: string) => {
        const response = await fetch(apiUrl);
        if (response.status !== 200) {
          throw new Error('There was some error fetching data');
        }

        if (type === 'raag') {
          const raags = await response.json();
          const searchRaags = raags.rows.map(
            ({ RaagID: id, RaagEnglish: en }) => {
              const searchRaag = {
                [id]: id === 0 ? 'All' : en,
              }
              return searchRaag;
            }
          );
          setRaags(searchRaags);
          return;
        }

        const writers = await response.json();
        console.log(writers, "writers ........")
        const searchWriters = writers.rows.map(
          ({ WriterID: id, WriterEnglish: en }) => {
            const searchWriter = {
              [id]: id === 0 ? 'All' : en,
            }
            return searchWriter;
          }
        )
        setWriters(searchWriters);
      }

      (async () => {
        setIsFetching(true);

        if (isShowSearchByRaags) {
          await fetchListAsync(`${API_URL}/raags`, 'raag');
        }
        if (isShowSearchByWriters) {
          await fetchListAsync(`${API_URL}/writers`);
        }

        setIsFetching(false);
      })();

    }, []);

    return {
      isFetching,
      raags,
      writers
    }
  }
