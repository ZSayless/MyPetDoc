import { useState, useEffect } from "react";

export function useCache(key, initialValue) {
  const [cachedValue, setCachedValue] = useState(() => {
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cachedValue));
  }, [key, cachedValue]);

  return [cachedValue, setCachedValue];
}
