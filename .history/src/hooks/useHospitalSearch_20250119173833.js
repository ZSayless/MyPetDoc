export function useHospitalSearch(searchTerm) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const searchHospitals = async () => {
      // Logic search hospitals
    };
    
    searchHospitals();
  }, [searchTerm]);

  return { results };
} 