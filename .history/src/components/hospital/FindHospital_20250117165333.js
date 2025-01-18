import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import HospitalList from "./HospitalList";
import HospitalMap from "./HospitalMap";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MOCK_HOSPITALS = [
  {
    id: 1,
    name: "PetCare Hospital",
    address: "123 Nguyen Van Linh, District 7, HCMC",
    distance: "0.5 km",
    rating: 4.8,
    services: ["Emergency", "Surgery", "Vaccination"],
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.66488007465357!3d10.759920059446151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s",
  },
  {
    id: 2,
    name: "VetCare Clinic",
    address: "456 Le Van Viet, District 9, HCMC",
    distance: "1.2 km",
    rating: 4.5,
    services: ["Dental Care", "Grooming", "Vaccination"],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.66488007465357!3d10.759920059446151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s",
  },
  {
    id: 3,
    name: "Pet Health Center",
    address: "789 Nguyen Thi Minh Khai, District 1, HCMC",
    distance: "2.0 km",
    rating: 4.9,
    services: ["Surgery", "Laboratory", "Emergency"],
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.66488007465357!3d10.759920059446151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s",
  },
  {
    id: 4,
    name: "Animal Care Hospital",
    address: "321 Vo Van Ngan, Thu Duc City, HCMC",
    distance: "2.5 km",
    rating: 4.7,
    services: ["Internal Medicine", "Radiology", "Pharmacy"],
    image: "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.66488007465357!3d10.759920059446151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s",
  },
  {
    id: 5,
    name: "City Pet Hospital",
    address: "159 Pham Van Dong, Binh Thanh District, HCMC",
    distance: "3.1 km",
    rating: 4.6,
    services: ["Surgery", "Vaccination", "Boarding"],
    image: "https://images.unsplash.com/photo-1597914772259-2da2f0eae78b",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.66488007465357!3d10.759920059446151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s",
  },
  {
    id: 6,
    name: "PawSome Clinic",
    address: "753 Nguyen Xi, Binh Thanh District, HCMC",
    distance: "3.8 km",
    rating: 4.4,
    services: ["Grooming", "Dental Care", "Vaccination"],
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.66488007465357!3d10.759920059446151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s",
  },
  {
    id: 7,
    name: "Happy Pets Clinic",
    address: "147 Vo Van Tan, District 3, HCMC",
    distance: "4.2 km",
    rating: 4.7,
    services: ["Grooming", "Vaccination", "Pet Hotel"],
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.66488007465357!3d10.759920059446151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s",
  },
  {
    id: 8,
    name: "Pet Paradise Center",
    address: "369 Hai Ba Trung, District 1, HCMC",
    distance: "4.8 km",
    rating: 4.6,
    services: ["Surgery", "Emergency", "Pharmacy"],
    image: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.66488007465357!3d10.759920059446151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s",
  },
  {
    id: 9,
    name: "Loving Care Pet Hospital",
    address: "258 Dien Bien Phu, Binh Thanh District, HCMC",
    distance: "5.1 km",
    rating: 4.8,
    services: ["Internal Medicine", "Laboratory", "Vaccination"],
    image: "https://images.unsplash.com/photo-1596272875886-f6313ed6c99f",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.66488007465357!3d10.759920059446151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s",
  },
  {
    id: 10,
    name: "Modern Pet Clinic",
    address: "951 Kha Van Can, Thu Duc City, HCMC",
    distance: "5.5 km",
    rating: 4.5,
    services: ["Dental Care", "Surgery", "Grooming"],
    image: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.66488007465357!3d10.759920059446151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s",
  },
];

const CITIES = [
  {
    id: "hcm",
    nameVi: "Thành phố Hồ Chí Minh",
    nameEn: "Ho Chi Minh City",
    description: "Trung tâm y tế lớn nhất Việt Nam",
    hospitalCount: "50+ Bệnh viện",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482",
  },
  {
    id: "hanoi",
    nameVi: "Hà Nội",
    nameEn: "Hanoi",
    description: "Cơ sở thú y hàng đầu",
    hospitalCount: "40+ Bệnh viện",
    image: "https://images.unsplash.com/photo-1599708153386-62bf3f03359b",
  },
  {
    id: "danang",
    nameVi: "Đà Nẵng",
    nameEn: "Da Nang",
    description: "Trung tâm chăm sóc thú cưng hiện đại",
    hospitalCount: "20+ Bệnh viện",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b",
  },
];

const FindHospital = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedServices, setSelectedServices] = useState(["All Hospitals"]);
  const [filteredHospitals, setFilteredHospitals] = useState(MOCK_HOSPITALS);
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

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  // Hàm helper để lấy tên thành phố theo ngôn ngữ
  const getCityName = (city) => {
    return i18n.language === 'vi' ? city.nameVi : city.nameEn;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#98E9E9] via-[#DBEAFE] to-[#EFF6FF]">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
              {t("findHospital.header.title")}
            </h1>

            {/* Search and City Filter Section */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={t("findHospital.header.searchPlaceholder")}
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
                      ? t("findHospital.header.allCities")
                      : getCityName(CITIES.find((city) => city.id === selectedCity)) ||
                        t("findHospital.header.allCities")}
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
                      {t("findHospital.header.allCities")}
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
                        {getCityName(city)}
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
                    {t(`findHospital.services.${service.toLowerCase()}`)}
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
                    {t(`findHospital.services.${service.toLowerCase()}`)}
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
                    {t(`findHospital.services.${service.toLowerCase()}`)}
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
                    <p>{t("findHospital.map.selectHospital")}</p>
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
