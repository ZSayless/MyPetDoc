import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import HospitalList from "./HospitalList";
import HospitalMap from "./HospitalMap";
import { useNavigate, useLocation } from "react-router-dom";
import { getHospitals } from "../../services/hospitalService";
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
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem("selectedCity") || "all";
  });
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const navigate = useNavigate();
  const [selectedHospital, setSelectedHospital] = useState(null);

  const listContainerRef = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    if (location.state?.selectedCity && !localStorage.getItem("selectedCity")) {
      const cityId = location.state.selectedCity;
      setSelectedCity(cityId);
      localStorage.setItem("selectedCity", cityId);

      const cityName = CITIES.find((city) => city.id === cityId)?.name;
      if (cityName) {
        const filteredResults = hospitals.filter((hospital) => {
          const address = hospital.address.toLowerCase();
          switch (cityId) {
            case "hcm":
              return (
                address.includes("hcmc") ||
                address.includes("ho chi minh") ||
                address.includes("thu duc")
              );
            case "hanoi":
              return address.includes("hanoi") || address.includes("ha noi");
            case "danang":
              return address.includes("danang") || address.includes("da nang");
            default:
              return true;
          }
        });
        setFilteredHospitals(filteredResults);
      }
    }
  }, [location.state, hospitals]);

  // Fetch hospitals data
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const response = await getHospitals();
        const formattedHospitals = response.hospitals.map((hospital) => ({
          id: hospital.id,
          name: hospital.name,
          address: hospital.address,
          rating: 4.5, // Giá trị mặc định vì API không có
          services: hospital.specialties ? hospital.specialties.split(',').map(s => s.trim()) : [],
          image: hospital.images[0]?.url,
          mapUrl: hospital.map_location,
          slug: hospital.slug,
        }));
        setHospitals(formattedHospitals);
        setFilteredHospitals(formattedHospitals);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bệnh viện:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // Filter hospitals based on search, city and services
  useEffect(() => {
    setLoading(true);
    let results = hospitals;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (hospital) =>
          hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by city - Chỉ filter khi selectedCity không phải "all"
    if (selectedCity && selectedCity !== "all") {
      const cityName = CITIES.find((city) => city.id === selectedCity)?.name;
      if (cityName) {
        // Sửa lại logic filter theo thành phố
        results = results.filter((hospital) => {
          const address = hospital.address.toLowerCase();
          switch (selectedCity) {
            case "hcm":
              return (
                address.includes("hcmc") ||
                address.includes("ho chi minh") ||
                address.includes("thu duc")
              );
            case "hanoi":
              return address.includes("hanoi") || address.includes("ha noi");
            case "danang":
              return address.includes("danang") || address.includes("da nang");
            default:
              return true;
          }
        });
      }
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
  }, [searchTerm, selectedCity, selectedServices, hospitals]);

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

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#98E9E9] via-[#DBEAFE] to-[#EFF6FF]">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
              Find a Hospital
            </h1>

            {/* Search and City Filter Section */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by hospital name..."
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#98E9E9] text-gray-700 text-sm md:text-base shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              {/* City Dropdown */}
              <div className="relative">
                <button
                  className="w-full md:w-60 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-between hover:bg-white/90 transition-colors"
                  onClick={() => setShowCityDropdown(!showCityDropdown)}
                >
                  <span>
                    {selectedCity === "all"
                      ? "All Cities"
                      : CITIES.find((city) => city.id === selectedCity)?.name ||
                        "All Cities"}
                  </span>
                  <ChevronDown className="w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                {showCityDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10">
                    <button
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      onClick={() => {
                        setSelectedCity("all");
                        setShowCityDropdown(false);
                      }}
                    >
                      All Cities
                    </button>
                    {CITIES.map((city) => (
                      <button
                        key={city.id}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50"
                        onClick={() => {
                          setSelectedCity(city.id);
                          setShowCityDropdown(false);
                        }}
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Services Filter - Desktop */}
            <div className="hidden md:block">
              {/* Row 1 */}
              <div className="flex justify-center gap-3 mb-3">
                {servicesRow1.map((service, index) => (
                  <button
                    key={index}
                    className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                      selectedServices.includes(service)
                        ? "bg-white text-gray-700 font-medium shadow-sm border-2 border-[#98E9E9]"
                        : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-transparent hover:border-[#98E9E9]"
                    }`}
                    onClick={() => handleServiceClick(service)}
                  >
                    {service}
                  </button>
                ))}
              </div>
              {/* Row 2 */}
              <div className="flex justify-center gap-3">
                {servicesRow2.map((service, index) => (
                  <button
                    key={index}
                    className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                      selectedServices.includes(service)
                        ? "bg-white text-gray-700 font-medium shadow-sm border-2 border-[#98E9E9]"
                        : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-transparent hover:border-[#98E9E9]"
                    }`}
                    onClick={() => handleServiceClick(service)}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Filter - Mobile */}
            <div className="md:hidden">
              <div className="flex flex-wrap justify-center gap-2">
                {[...servicesRow1, ...servicesRow2].map((service, index) => (
                  <button
                    key={index}
                    className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-colors text-sm ${
                      selectedServices.includes(service)
                        ? "bg-white text-gray-700 font-medium shadow-sm border-2 border-[#98E9E9]"
                        : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-transparent hover:border-[#98E9E9]"
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
      </div>

      {/* Main Content - Split View */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Hospital List */}
          <div className="w-full lg:w-3/5">
            <HospitalList
              hospitals={currentHospitals}
              loading={loading}
              onHospitalClick={handleHospitalClick}
              selectedHospital={selectedHospital}
            />
          </div>

          {/* Map */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
              <div className="h-[calc(100vh-150px)] rounded-lg overflow-hidden">
                {selectedHospital ? (
                  <iframe
                    src={selectedHospital.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                    <p>Chọn một bệnh viện để xem vị trí</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindHospital;
