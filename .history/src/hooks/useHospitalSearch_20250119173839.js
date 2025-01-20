import { useState, useEffect } from 'react';
import { hospitals } from '../mocks/hospitalData';

export function useHospitalSearch(searchTerm) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const searchHospitals = async () => {
      try {
        const filteredResults = hospitals.filter((hospital) =>
          hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredResults);
      } catch (error) {
        console.error('Error searching hospitals:', error);
        setResults([]);
      }
    };
    
    searchHospitals();
  }, [searchTerm]);

  return { hospitals: results };
}

// Mock data - có thể chuyển vào file riêng sau
const hospitals = [
  {
    id: 1,
    name: "PawSome Pet Hospital",
    info: "Information of Hospital",
    address: "123 Nguyen Hue, District 1, HCMC",
    rating: 4.5,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7",
    services: ["Surgery", "Dentistry"],
  },
  // ... thêm data bệnh viện khác
]; 