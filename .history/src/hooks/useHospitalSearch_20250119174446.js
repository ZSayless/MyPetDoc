import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export function useHospitalSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  return {
    searchTerm,
    debouncedSearchTerm,
    handleSearch
  };
} 