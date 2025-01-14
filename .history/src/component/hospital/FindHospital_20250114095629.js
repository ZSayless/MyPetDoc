import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import HospitalList from "./HospitalList";
import HospitalMap from "./HospitalMap";
import { useNavigate, useLocation } from "react-router-dom";

const MOCK_HOSPITALS = [
  {
    id: 1,
    name: "PetCare Hospital",
    address: "123 Nguyen Van Linh, District 7, HCMC",
    distance: "0.5 km",
    rating: 4.8,
    services: ["Emergency", "Surgery", "Vaccination"],
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
  },
  {
    id: 2,
    name: "VetCare Clinic",
    address: "456 Le Van Viet, District 9, HCMC",
    distance: "1.2 km",
    rating: 4.5,
    services: ["Dental Care", "Grooming", "Vaccination"],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
  },
  {
    id: 3,
    name: "Pet Health Center",
    address: "789 Nguyen Thi Minh Khai, District 1, HCMC",
    distance: "2.0 km",
    rating: 4.9,
    services: ["Surgery", "Laboratory", "Emergency"],
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def",
  },
  {
    id: 4,
    name: "Animal Care Hospital",
    address: "321 Vo Van Ngan, Thu Duc City, HCMC",
    distance: "2.5 km",
    rating: 4.7,
    services: ["Internal Medicine", "Radiology", "Pharmacy"],
    image: "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06",
  },
  {
    id: 5,
    name: "City Pet Hospital",
    address: "159 Pham Van Dong, Binh Thanh District, HCMC",
    distance: "3.1 km",
    rating: 4.6,
    services: ["Surgery", "Vaccination", "Boarding"],
    image: "https://images.unsplash.com/photo-1597914772259-2da2f0eae78b",
  },
  {
    id: 6,
    name: "PawSome Clinic",
    address: "753 Nguyen Xi, Binh Thanh District, HCMC",
    distance: "3.8 km",
    rating: 4.4,
    services: ["Grooming", "Dental Care", "Vaccination"],
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09",
  },
  {
    id: 7,
    name: "Happy Pets Clinic",
    address: "147 Vo Van Tan, District 3, HCMC",
    distance: "4.2 km",
    rating: 4.7,
    services: ["Grooming", "Vaccination", "Pet Hotel"],
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97",
  },
  {
    id: 8,
    name: "Pet Paradise Center",
    address: "369 Hai Ba Trung, District 1, HCMC",
    distance: "4.8 km",
    rating: 4.6,
    services: ["Surgery", "Emergency", "Pharmacy"],
    image: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783",
  },
  {
    id: 9,
    name: "Loving Care Pet Hospital",
    address: "258 Dien Bien Phu, Binh Thanh District, HCMC",
    distance: "5.1 km",
    rating: 4.8,
    services: ["Internal Medicine", "Laboratory", "Vaccination"],
    image: "https://images.unsplash.com/photo-1596272875886-f6313ed6c99f",
  },
  {
    id: 10,
    name: "Modern Pet Clinic",
    address: "951 Kha Van Can, Thu Duc City, HCMC",
    distance: "5.5 km",
    rating: 4.5,
    services: ["Dental Care", "Surgery", "Grooming"],
    image: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783",
  },
];

const CITIES = [
  {
    id: "hcm",
    name: "Ho Chi Minh City",
    description: "Vietnam's largest healthcare hub",
    hospitalCount: "50+ Hospitals",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482",
  },
  {
    id: "hanoi",
    name: "Hanoi",
    description: "Leading veterinary facilities",
    hospitalCount: "40+ Hospitals",
    image: "https://images.unsplash.com/photo-1599708153386-62bf3f03359b",
  },
  {
    id: "danang",
    name: "Da Nang",
    description: "Modern pet care centers",
    hospitalCount: "20+ Hospitals",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b",
  },
];

const FindHospital = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedServices, setSelectedServices] = useState(["All Hospitals"]);
  const [filteredHospitals, setFilteredHospitals] = useState(MOCK_HOSPITALS);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("all");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const navigate = useNavigate();

  const listContainerRef = useRef(null);
  const servicesRef = useRef(null);

  // Set initial city from location state when component mounts
  useEffect(() => {
    // Kiểm tra city từ location state (khi click từ trang home)
    if (location.state?.selectedCity) {
      const cityId = location.state.selectedCity;
      setSelectedCity(cityId);

      // Tự động filter hospitals theo thành phố
      const cityName = CITIES.find((city) => city.id === cityId)?.name;
      if (cityName) {
        const filteredResults = MOCK_HOSPITALS.filter((hospital) =>
          hospital.address.includes(cityName)
        );
        setFilteredHospitals(filteredResults);
      }
    }
  }, [location.state]);

  // Filter hospitals based on search, city and services
  useEffect(() => {
    setLoading(true);
    let results = MOCK_HOSPITALS;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (hospital) =>
          hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by city
    if (selectedCity !== "all") {
      const cityName = CITIES.find((city) => city.id === selectedCity)?.name;
      results = results.filter((hospital) =>
        hospital.address.includes(cityName)
      );
    }

    // Filter by selected services
    if (!selectedServices.includes("All Hospitals")) {
      results = results.filter((hospital) =>
        hospital.services.some((service) => selectedServices.includes(service))
      );
    }

    setFilteredHospitals(results);
    setCurrentPage(1);
    setLoading(false);
  }, [searchTerm, selectedCity, selectedServices]);

  // Pagination
  const hospitalsPerPage = 5;
  const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage);
  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(
    indexOfFirstHospital,
    indexOfLastHospital
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 250,
      behavior: "smooth",
    });
  };

  // Sắp xếp lại services thành 2 hàng cho desktop
  const servicesRow1 = [
    "All Hospitals",
    "Emergency",
    "Surgery",
    "Vaccination",
    "Dental Care",
    "Grooming",
    "Laboratory",
  ];

  const servicesRow2 = [
    "Internal Medicine",
    "Radiology",
    "Pharmacy",
    "Pet Hotel",
    "Boarding",
  ];

  const handlePrevService = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const handleNextService = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const handleServiceClick = (service) => {
    if (service === "All Hospitals") {
      setSelectedServices(["All Hospitals"]);
      return;
    }

    let newSelected = [...selectedServices];
    if (selectedServices.includes("All Hospitals")) {
      newSelected = [];
    }

    if (newSelected.includes(service)) {
      newSelected = newSelected.filter((s) => s !== service);
    } else {
      newSelected.push(service);
    }

    if (newSelected.length === 0) {
      newSelected = ["All Hospitals"];
    }

    setSelectedServices(newSelected);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-[#1A3C8E]">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-4">
              Find a Hospital
            </h1>

            {/* Search and City Filter Section */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by hospital name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              {/* City Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCityDropdown(!showCityDropdown)}
                  className="w-full md:w-auto px-4 py-2 bg-white rounded-full flex items-center justify-between gap-2"
                >
                  <span>
                    {selectedCity === "all"
                      ? "All Cities"
                      : CITIES.find((city) => city.id === selectedCity)?.name}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {/* Dropdown content */}
              </div>
            </div>

            {/* Services Filter */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {servicesRow1.map((service) => (
                <button
                  key={service}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                    selectedServices.includes(service)
                      ? "bg-[#98E9E9] text-gray-700 font-medium"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleServiceClick(service)}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex flex-col lg:flex-row flex-1">
        <HospitalList hospitals={currentHospitals} loading={loading} />
        <HospitalMap selectedCity={selectedCity} />
      </div>
    </div>
  );
};

export default FindHospital;
