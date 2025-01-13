import React, { useState, useRef, useEffect } from "react";
import { MapPin, Search, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const FindHospital = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedServices, setSelectedServices] = useState(["All Hospitals"]);
  const [filteredHospitals, setFilteredHospitals] = useState(MOCK_HOSPITALS);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const listContainerRef = useRef(null);
  const servicesRef = useRef(null);

  // Filter hospitals based on search and selected services
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

    // Filter by selected services
    if (!selectedServices.includes("All Hospitals")) {
      results = results.filter((hospital) =>
        hospital.services.some((service) => selectedServices.includes(service))
      );
    }

    setFilteredHospitals(results);
    setCurrentPage(1);
    setLoading(false);
  }, [searchTerm, selectedServices]);

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

  const services = [
    "All Hospitals",
    "Emergency",
    "Surgery",
    "Vaccination",
    "Dental Care",
    "Grooming",
    "Laboratory",
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
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6">
              Find a Hospital
            </h1>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter address or city"
                  className="w-full pl-10 pr-4 py-2 md:py-3 rounded-lg bg-white focus:outline-none text-sm md:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              </div>
              <select className="w-full md:w-36 py-2 md:py-3 px-4 rounded-lg bg-white appearance-none cursor-pointer text-sm md:text-base">
                <option value="10">10 miles</option>
                <option value="20">20 miles</option>
                <option value="30">30 miles</option>
              </select>
              <button className="p-2 md:p-3 rounded-lg bg-white hover:bg-gray-50">
                <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              </button>
            </div>

            {/* Services Filter */}
            <div className="relative mt-4">
              <button
                onClick={handlePrevService}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center shadow-md"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <div
                className="flex items-center gap-2 overflow-hidden mx-8 md:mx-10"
                ref={servicesRef}
              >
                {services.map((service, index) => (
                  <button
                    key={index}
                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full whitespace-nowrap transition-colors text-sm md:text-base ${
                      selectedServices.includes(service)
                        ? "bg-[#98E9E9] text-gray-700"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => handleServiceClick(service)}
                  >
                    {service}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextService}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center shadow-md"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Hospital List */}
        <div 
          className="w-full lg:w-1/2 overflow-y-auto" 
          style={{ height: "calc(100vh - 200px)" }}
        >
          <div className="p-3 lg:p-4 space-y-3 lg:space-y-4">
            {currentHospitals.map((hospital, index) => (
              <div
                key={hospital.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 lg:p-4">
                  <div className="flex gap-3 lg:gap-4">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-16 h-16 lg:w-28 lg:h-28 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1 lg:mb-2">
                        <h3 className="text-sm lg:text-lg font-semibold text-gray-900 truncate">
                          {hospital.name}
                        </h3>
                        <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs lg:text-sm">
                          <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />
                          {hospital.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 mb-1 lg:mb-2 text-xs lg:text-sm">
                        <MapPin className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                        <span className="truncate">{hospital.address}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block px-2 py-0.5 text-xs lg:text-sm text-blue-600 bg-blue-50 rounded-lg">
                          {hospital.distance}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1 lg:gap-2">
                          {hospital.services.map((service, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 text-xs lg:text-sm bg-gray-100 text-gray-600 rounded-lg"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                        <button
                          className="px-3 lg:px-6 py-1.5 text-xs lg:text-base bg-[#98E9E9] hover:bg-[#7CD5D5] text-gray-700 rounded-lg transition-colors"
                          onClick={() => navigate(`/hospital/${hospital.id}`)}
                        >
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-center py-4">
                <div className="w-6 h-6 lg:w-8 lg:h-8 border-4 border-[#98E9E9] border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div 
          className="w-full lg:w-1/2 h-[300px] lg:h-[calc(100vh-200px)] lg:sticky lg:top-0"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15677.977147902919!2d106.69842159999999!3d10.787312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1710900646899!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FindHospital;
