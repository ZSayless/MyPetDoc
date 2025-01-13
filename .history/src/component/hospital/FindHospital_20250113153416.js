import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import HospitalList from "./HospitalList";
import HospitalMap from "./HospitalMap";

const FindHospital = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentHospitals, setCurrentHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock cities data
  const cities = [
    { id: "all", name: "All Cities" },
    { id: "hcm", name: "Ho Chi Minh City" },
    { id: "hanoi", name: "Ha Noi" },
    { id: "danang", name: "Da Nang" },
    { id: "cantho", name: "Can Tho" },
    { id: "nhatrang", name: "Nha Trang" },
  ];

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

    // Filter by selected city
    if (selectedCity !== "all") {
      results = results.filter((hospital) =>
        hospital.address.toLowerCase().includes(selectedCity)
      );
    }

    // Filter by selected services
    if (!selectedServices.includes("All Hospitals")) {
      results = results.filter((hospital) =>
        hospital.services.some((service) => selectedServices.includes(service))
      );
    }

    setCurrentHospitals(results);
    setLoading(false);
  }, [searchTerm, selectedCity, selectedServices]);

  const handleServiceClick = (service) => {
    if (service === "All Hospitals") {
      setSelectedServices([]);
      return;
    }

    setSelectedServices((prev) => {
      if (prev.includes(service)) {
        return prev.filter((s) => s !== service);
      }
      return [...prev, service];
    });
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
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search by hospital name or location..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#98E9E9] text-gray-700 text-sm md:text-base shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* City Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm md:text-base ${
                      selectedCity === city.id
                        ? "bg-[#98E9E9] text-gray-700 font-medium shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Filter */}
            <div>
              <div className="flex flex-wrap gap-2">
                {services.map((service, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm md:text-base ${
                      selectedServices.includes(service) || (service === "All Hospitals" && selectedServices.length === 0)
                        ? "bg-[#98E9E9] text-gray-700 font-medium shadow-sm"
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
      </div>

      {/* Main Content - Split View */}
      <div className="flex flex-col lg:flex-row flex-1">
        <HospitalList hospitals={currentHospitals} loading={loading} />
        <HospitalMap />
      </div>
    </div>
  );
};

export default FindHospital;
