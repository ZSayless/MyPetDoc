import { useState, useCallback } from 'react';

const cache = new Map();

export function useCache(key, fetchFn) {
  const [data, setData] = useState(cache.get(key));

  const fetch = useCallback(async () => {
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = await fetchFn();
    cache.set(key, result);
    setData(result);
    return result;
  }, [key, fetchFn]);

  return { data, fetch };
} 