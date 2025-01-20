import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export function useHospitalSearch(initialHospitals = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [hospitals, setHospitals] = useState(initialHospitals);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const filteredHospitals = useCallback(() => {
    return hospitals.filter((hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [hospitals, searchTerm]);

  return {
    searchTerm,
    debouncedSearchTerm,
    handleSearch,
    hospitals,
    setHospitals,
    filteredHospitals
  };
} 