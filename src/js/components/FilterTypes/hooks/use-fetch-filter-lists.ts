import { useState, useEffect } from 'react';
import { filterListsCache } from '../utils';

export const useFetchFilterLists = ({
  isShowFilterByRaags,
  isShowFilterByWriters,
}: {
  isShowFilterByRaags: boolean;
  isShowFilterByWriters: boolean;
}) => {
  const [isFetching, setIsFetching] = useState<Boolean>(false);
  console.log(filterListsCache, 'filter list cache object,');

  const [raags, setRaags] = useState<{ id: string }[]>(filterListsCache.raags);
  const [writers, setWriters] = useState<{ id: string }[]>(
    filterListsCache.writers
  );

  useEffect(() => {
    const fetchListAsync = async (apiUrl: string, type?: string) => {
      const response = await fetch(apiUrl);
      if (response.status !== 200) {
        throw new Error('There was some error fetching data');
      }

      if (type === 'raag') {
        const raags = await response.json();
        const filterRaags = raags.rows.map(
          ({ RaagID: id, RaagEnglish: en }) => {
            const filterRaag = {
              [id]: id === 0 ? 'All Raags' : en,
            };
            return filterRaag;
          }
        );
        // cache the results for raags.
        filterListsCache.raags = filterRaags;
        setRaags(filterRaags);
        return;
      }

      const writers = await response.json();
      console.log(writers, 'writers ........');
      const filterWriters = writers.rows.map(
        ({ WriterID: id, WriterEnglish: en }) => {
          const filterWriter = {
            [id]: id === 0 ? 'All Writers' : en,
          };
          return filterWriter;
        }
      );

      // cache the results for writers.
      filterListsCache.writers = filterWriters;
      setWriters(filterWriters);
    };

    (async () => {
      setIsFetching(true);

      if (isShowFilterByRaags) {
        // If we don't have raags in cache, then fetch it.
        if (!filterListsCache.raags.length) {
          await fetchListAsync(`${API_URL}/raags`, 'raag');
        }
      }
      if (isShowFilterByWriters) {
        // If we don't have writers in cache, then fetch it.
        if (!filterListsCache.writers.length) {
          await fetchListAsync(`${API_URL}/writers`);
        }
      }

      setIsFetching(false);
    })();
  }, []);

  return {
    isFetching,
    raags,
    writers,
  };
};
