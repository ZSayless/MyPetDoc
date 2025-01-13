import React, { useState, useRef } from "react";
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
  const navigate = useNavigate();
  const listContainerRef = useRef(null);

  const hospitalsPerPage = 5;
  const totalPages = Math.ceil(MOCK_HOSPITALS.length / hospitalsPerPage);
  const currentHospitals = MOCK_HOSPITALS.slice(
    (currentPage - 1) * hospitalsPerPage,
    currentPage * hospitalsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 250,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Search Section */}
      <div className="bg-[#1A3C8E] relative">
        <div className="container mx-auto px-4 py-8">
          {/* View by State */}
          <div className="absolute top-4 right-4 md:right-8">
            <button className="flex items-center gap-2 text-white hover:text-blue-200">
              <MapPin className="w-5 h-5" />
              <span>View Hospitals by State</span>
            </button>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Find a Hospital
            </h1>

            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter address, city or zip code."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <select className="w-36 py-3 px-4 rounded-lg bg-white appearance-none cursor-pointer">
                <option value="10">10 miles</option>
                <option value="20">20 miles</option>
                <option value="30">30 miles</option>
              </select>
              <button className="p-3 rounded-lg bg-white hover:bg-gray-50">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Service Types */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button className="px-4 py-2 rounded-full bg-[#98E9E9] text-gray-700 hover:bg-[#7CD5D5] whitespace-nowrap">
                All Hospitals
              </button>
              <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                Primary Care
              </button>
              <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                Specialty Care
              </button>
              <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                Emergency Care
              </button>
              <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                Urgent Care
              </button>
              <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                Boarding
              </button>
              <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                Boarding & Grooming
              </button>
              <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                Grooming
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {searchTerm ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?..."
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Hospital List */}
            <div ref={listContainerRef} className="space-y-4">
              {currentHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-3 md:p-4">
                    <div className="flex gap-4">
                      <img
                        src={hospital.image}
                        alt={hospital.name}
                        className="w-20 h-20 md:w-28 md:h-28 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base md:text-lg font-semibold text-gray-900">
                            {hospital.name}
                          </h3>
                          <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-lg">
                            <Star className="w-4 h-4 fill-current" />
                            {hospital.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{hospital.address}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block px-2 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg">
                            {hospital.distance}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {hospital.services.map((service, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs md:text-sm bg-gray-100 text-gray-600 rounded-lg"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                          <button
                            className="px-4 md:px-6 py-1.5 text-sm md:text-base bg-[#98E9E9] hover:bg-[#7CD5D5] text-gray-700 rounded-lg transition-colors ml-2 md:ml-4"
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

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`w-10 h-10 rounded-lg border ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px] text-gray-500">
            Please provide address or postal code.
          </div>
        )}
      </div>
    </div>
  );
};

export default FindHospital;
